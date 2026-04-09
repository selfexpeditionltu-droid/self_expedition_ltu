import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// ── Rate limiter (in-memory, per IP) ─────────────────────────────────────────
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5;
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count++;
  return false;
}

const NOTIFICATION_EMAIL = "funk332@gmail.com";

interface LeadData {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  activity: string;
  comments?: string;
}

async function sendEmailNotification(lead: LeadData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Self Expedition" <${process.env.GMAIL_USER}>`,
    to: NOTIFICATION_EMAIL,
    subject: `Nauja registracija — ${lead.name} ${lead.lastname}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c8a96e;">Nauja registracija</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Vardas</td><td style="padding: 8px;">${lead.name} ${lead.lastname}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">Tel. numeris</td><td style="padding: 8px;">${lead.phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">El. paštas</td><td style="padding: 8px;">${lead.email}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">Veikla</td><td style="padding: 8px;">${lead.activity}</td></tr>
          ${lead.comments ? `<tr><td style="padding: 8px; font-weight: bold;">Komentarai</td><td style="padding: 8px;">${lead.comments}</td></tr>` : ""}
          <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">Data</td><td style="padding: 8px;">${new Date().toLocaleString("lt-LT", { timeZone: "Europe/Vilnius" })}</td></tr>
        </table>
      </div>
    `,
  });
}

async function appendToGoogleSheet(lead: LeadData) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const sheetId = process.env.LEADS_SHEET_ID;

  if (!privateKey || !clientEmail || !sheetId) return;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString("lt-LT", { timeZone: "Europe/Vilnius" }),
          lead.name,
          lead.lastname,
          lead.phone,
          lead.email,
          lead.activity,
          lead.comments ?? "",
        ],
      ],
    },
  });
}

export async function POST(req: NextRequest) {
  // ── Origin check ───────────────────────────────────────────────────────────
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    const origin = req.headers.get("origin") ?? "";
    if (!origin.startsWith(siteUrl)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // ── Rate limit ─────────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { name, lastname, phone, email, activity, comments } = body as LeadData;

    if (!name || !lastname || !phone || !email || !activity) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const lead: LeadData = { name, lastname, phone, email, activity, comments };

    const results = await Promise.allSettled([
      sendEmailNotification(lead),
      appendToGoogleSheet(lead),
    ]);

    const emailResult = results[0];
    const sheetResult = results[1];

    if (emailResult.status === "rejected") {
      console.error("Email send failed:", emailResult.reason);
    }
    if (sheetResult.status === "rejected") {
      console.error("Google Sheet append failed:", sheetResult.reason);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
