import { IonList } from "@ionic/react";
import CalendarEventCard from "./EventCard";
import { calendarStore } from "../../Calendar/calendarStore";
import { observer } from "mobx-react-lite";

export const CalendarEventList = observer(() => {
  return (
    <IonList>
      {calendarStore.selectedCalendarEvents.map((event) => (
        <CalendarEventCard
          key={event.id}
          event={event}
          eventAlarms={calendarStore.eventsAlarms[event.id]}
        />
      ))}
    </IonList>
  );
});

export default CalendarEventList;
