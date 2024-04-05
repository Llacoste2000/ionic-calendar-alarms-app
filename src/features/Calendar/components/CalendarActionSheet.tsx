import { IonActionSheet } from "@ionic/react";
import { calendarStore } from "../calendarStore";
import { observer } from "mobx-react-lite";

const CalendarActionSheet = observer(() => {
  const handleSelectCalendar = async (calendarId: number) => {
    calendarStore.selectCalendar(calendarId);
    await calendarStore.fetchSelectedCalendarEvents(calendarId);
  };

  const handleOnDismiss = () => {
    calendarStore.setCalendarsActionSheetVisibility(false);
  };

  return (
    <IonActionSheet
      isOpen={calendarStore.showCalendarsActionSheet}
      header="Select a calendar"
      buttons={calendarStore.filteredCalendars.map((calendar) => ({
        text: calendar.name,
        handler: () => handleSelectCalendar(calendar.id),
      }))}
      onDidDismiss={handleOnDismiss}
    />
  );
});

export default CalendarActionSheet;
