import { makeAutoObservable } from "mobx";
import { calendarPlugin } from "../../shared/plugins/calendar";
import { makePersistable } from "mobx-persist-store";
import { persistOptions } from "../../persistOptions";
import { Calendar, CalendarEvent, EventAlarms } from "./types";

class CalendarStore {
  calendars: Calendar[] = [];
  selectedCalendar: Calendar | null = null;
  showCalendarsActionSheet = false;

  events: CalendarEvent[] = [];
  eventsAlarms: EventAlarms[] = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(
      this,
      {
        ...persistOptions.storageOptions,
        name: "CalendarStore",
        properties: ["calendars", "selectedCalendar", "events", "eventsAlarms"],
      },
      persistOptions.reactOptions,
    );
  }

  setCalendarsActionSheetVisibility(visibility: boolean) {
    this.showCalendarsActionSheet = visibility;
  }

  setCalendars(calendars: Calendar[]) {
    this.calendars = calendars;
  }

  addCalendar(calendar: Calendar) {
    this.calendars.push(calendar);
  }

  removeCalendar(id: number) {
    this.calendars = this.calendars.filter((calendar) => calendar.id !== id);
  }

  selectCalendar(calendarId: number | null) {
    this.selectedCalendar =
      this.calendars.find((calendar) => calendar.id === calendarId) || null;
  }

  setCalendarEvents(events: CalendarEvent[]) {
    this.events = events;
  }

  setAlarmOfCalendarEvent(
    alarmState: boolean,
    eventId: number,
    alarmType: keyof EventAlarms,
  ) {
    if (!this.eventsAlarms[eventId]) {
      this.eventsAlarms[eventId] = {} as EventAlarms;
    }
    this.eventsAlarms[eventId][alarmType] = alarmState;
  }

  get filteredCalendars() {
    return this.calendars.filter((calendar) => calendar.name.includes("@"));
  }

  get selectedCalendarEvents() {
    return this.events
      .slice()
      .sort((a, b) => a.dtStart - b.dtStart)
      .filter(
        (event) => !event.organizer.includes("group.v.calendar.google.com"),
      );
  }

  // ACTIONS

  async fetchCalendars() {
    const { calendars } = await calendarPlugin.getCalendarsList();
    this.setCalendars(calendars);
  }

  async fetchSelectedCalendarEvents(calendarId: number) {
    const result = await calendarPlugin.getCalendarEvents({ calendarId });
    this.setCalendarEvents(result.events);
    // this.setCalendarEvents(calendarCalendarEventsMocks);
  }
}

export const calendarStore = new CalendarStore();
