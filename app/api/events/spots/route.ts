import { NextResponse } from "next/server";
import { google } from "googleapis";
import { events } from "@/lib/events";

const sheetsAuth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
const sheetsClient = google.sheets({ version: "v4", auth: sheetsAuth });

export interface SpotsResult {
  [eventId: string]: {
    capacity: number;
    spots_taken: number;
    spots_left: number;
  };
}

export async function GET() {
  // Separate events into those using spots_override vs those needing sheet query
  const overrideOnly = events.filter((e) => e.spots_override !== null);
  const needsSheet = events.filter((e) => e.spots_override === null);

  // Start with override values
  const result: SpotsResult = {};
  for (const e of overrideOnly) {
    const taken = e.spots_override as number;
    result[e.id] = {
      capacity: e.capacity,
      spots_taken: taken,
      spots_left: Math.max(0, e.capacity - taken),
    };
  }

  // If any events need live sheet data, query once
  if (needsSheet.length > 0) {
    const sheetId = process.env.LEADS_SHEET_ID;
    if (sheetId) {
      try {
        const response = await sheetsClient.spreadsheets.values.get({
          spreadsheetId: sheetId,
          // col H (index 0) = groupSize, col I (index 1) = eventId, col J (index 2) = status
          range: "Sheet1!H:J",
        });
        const rows = response.data.values ?? [];

        // Sum groupSize per eventId — skip cancelled rows
        const takenMap: Record<string, number> = {};
        for (const row of rows) {
          const groupSizeRaw = row[0];
          const eventId = row[1];
          const status = (row[2] ?? "").toString().trim().toLowerCase();
          if (!eventId || !groupSizeRaw) continue;
          if (status === "atšaukta") continue; // cancelled — don't count
          const n = parseInt(groupSizeRaw, 10);
          if (isNaN(n)) continue;
          takenMap[eventId] = (takenMap[eventId] ?? 0) + n;
        }

        for (const e of needsSheet) {
          const taken = takenMap[e.id] ?? 0;
          result[e.id] = {
            capacity: e.capacity,
            spots_taken: taken,
            spots_left: Math.max(0, e.capacity - taken),
          };
        }
      } catch (err) {
        console.error("Spots query failed:", err);
        // Fall back to showing full capacity if sheet is unavailable
        for (const e of needsSheet) {
          result[e.id] = {
            capacity: e.capacity,
            spots_taken: 0,
            spots_left: e.capacity,
          };
        }
      }
    }
  }

  return NextResponse.json(result, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
  });
}
