export interface Calendar {
  id: number;
  name: string;
  accountName: string;
  accountType: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  dtStart: number;
  dtEnd: number;
  calendarId: number;
  organizer: string;
}

export type EventAlarms = {
  fiveMinutes: boolean;
  fifteenMinutes: boolean;
  thirtyMinutes: boolean;
};
