import eventsData from "@/data/events.json";

export interface CalendarEvent {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  title: string;
  activities: string[];
  price_eur: number;
  time: string;
  duration: string;
  location: string;
  capacity: number;          // max people for this event
  spots_override: number | null; // if set, use instead of querying sheet (for testing/manual override)
  registration_link: string;
}

export const events: CalendarEvent[] = eventsData.events as CalendarEvent[];

/** Returns a map of "YYYY-MM-DD" → CalendarEvent for quick date lookups */
export function buildEventMap(eventList: CalendarEvent[]): Record<string, CalendarEvent> {
  return Object.fromEntries(eventList.map((e) => [e.date, e]));
}
