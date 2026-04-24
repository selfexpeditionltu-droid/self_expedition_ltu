# Self Expedition — Client Guide

Two things you will need to manage yourself:
1. **Adding events to the calendar** — done via GitHub (auto-deploys to the website)
2. **Cancelling registrations** — done directly in Google Sheets

---

## Part 1 — Adding a new event to the calendar

### What you need
- A GitHub account with access to this repository
- A browser (no installations needed)

### Step-by-step

**1. Open the file on GitHub**

Go to your repository on GitHub and navigate to:
```
data/events.json
```

Click the pencil icon (Edit this file) in the top-right corner of the file view.

---

**2. Copy an existing event block**

You will see the list of events. Copy everything from one `{` to its matching `}`, including the comma after it. Example of one event block:

```json
{
  "id": "2026-07-06-bundle",
  "date": "2026-07-06",
  "title": "Vasaros Ekspedicija",
  "activities": [
    "Nusileidimas virve nuo tilto",
    "Mokysimės orientuotis žemėlapiu ir kompasu, įveiksime žygį",
    "Mokysimės ugnies įkūrimo"
  ],
  "price_eur": 120,
  "time": "10:00–18:00",
  "duration": "8 val.",
  "location": "Kaišiadorių raj.",
  "capacity": 20,
  "spots_override": null,
  "registration_link": "#registracija"
},
```

Paste it after the last event in the list (inside the `"events": [ ... ]` array).

---

**3. Fill in your new event details**

Change each field:

| Field | What to change | Example |
|---|---|---|
| `id` | Unique name — use date + short word, no spaces | `"2026-08-15-rapel"` |
| `date` | Date in YYYY-MM-DD format | `"2026-08-15"` |
| `title` | Event name shown on the website | `"Rugpjūčio Ekspedicija"` |
| `activities` | List of activities (each one in quotes, comma-separated) | see example above |
| `price_eur` | Price per person, number only | `120` |
| `time` | Start–end time | `"10:00–18:00"` |
| `duration` | Duration label | `"8 val."` |
| `location` | Location name | `"Kaišiadorių raj."` |
| `capacity` | Maximum number of people | `20` |
| `spots_override` | Leave as `null` (the website counts automatically from registrations) | `null` |
| `registration_link` | Leave as `"#registracija"` | `"#registracija"` |

> **Important:** The `id` must be unique — no two events can have the same id.

---

**4. Save and deploy**

- Scroll to the bottom of the GitHub editor
- Click **"Commit changes"**
- Add a short message like `Add August event` and click **Commit changes** again

Vercel will automatically detect the change and redeploy the website. It takes about **1–2 minutes**. The new event will appear on the calendar immediately after.

---

### Temporarily hiding an event (without deleting it)

If you need to temporarily hide an event from the calendar (e.g. it was postponed), simply change the `date` to a past date or add `"hidden": true` — or just delete the event block entirely and re-add it later.

---

## Part 2 — Cancelling a registration in Google Sheets

Every registration is saved automatically to Google Sheets. When someone cancels or you need to remove a test registration, you do not delete the row — you simply mark it as cancelled.

### How to cancel a registration

1. Open Google Sheets and find the registration row
2. Go to **column J** (the last column, labelled **Status**)
3. The cell currently says `aktyvi`
4. Change it to `atšaukta`

That's it. The website will automatically stop counting that person's group toward the available spots. The calendar updates within ~1 minute.

### Google Sheets column reference

| Column | Contents |
|---|---|
| A | Registration date & time |
| B | First name |
| C | Last name |
| D | Phone number |
| E | Email |
| F | Activity / event |
| G | Comments |
| H | Group size |
| I | Event ID (only for calendar registrations) |
| J | **Status** — `aktyvi` = counts toward spots / `atšaukta` = cancelled, ignored |

---

## Part 3 — Testing without affecting live data

If you want to test the registration form, submit a test lead, then go to Google Sheets, find the row, and set column J to `atšaukta`. The test group size will be removed from the spot count automatically.

---

## Quick reference

| Task | Where |
|---|---|
| Add/edit an event | GitHub → `data/events.json` → Edit → Commit |
| Cancel a registration | Google Sheets → find row → column J → type `atšaukta` |
| Check registrations | Google Sheets |
| See the live website | Vercel dashboard or your domain |
