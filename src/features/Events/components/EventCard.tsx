import { calendarStore } from "../../Calendar/calendarStore";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItemGroup,
  IonItem,
  IonCheckbox,
  IonIcon,
} from "@ionic/react";
import { alarm } from "ionicons/icons";
import { CalendarEvent, EventAlarms } from "../../Calendar/types";

type CalendarEventCardProps = {
  event: CalendarEvent;
  eventAlarms: EventAlarms;
};

const CalendarEventCard = ({ event, eventAlarms }: CalendarEventCardProps) => {
  const handleChangeFiveMinsAlarm = (e: CustomEvent) => {
    calendarStore.setAlarmOfCalendarEvent(
      e.detail.checked,
      event.id,
      "fiveMinutes",
    );
  };

  const handleChangeFifteenMinsAlarm = (e: CustomEvent) => {
    calendarStore.setAlarmOfCalendarEvent(
      e.detail.checked,
      event.id,
      "fifteenMinutes",
    );
  };

  const handleChangeThirtyMinsAlarm = (e: CustomEvent) => {
    calendarStore.setAlarmOfCalendarEvent(
      e.detail.checked,
      event.id,
      "thirtyMinutes",
    );
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{event.title}</IonCardTitle>
        <IonCardSubtitle>
          {new Date(event.dtStart).toLocaleString()} <br />
          Organizer: {event.organizer}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItemGroup>
          <IonItem lines="none">
            <IonCheckbox
              slot="start"
              aria-label="5 minutes before"
              onIonChange={handleChangeFiveMinsAlarm}
              checked={eventAlarms?.fiveMinutes}
            />
            <IonIcon icon={alarm} size="small" />5 minutes before
          </IonItem>
          <IonItem lines="none">
            <IonCheckbox
              slot="start"
              aria-label="15 minutes before"
              onIonChange={handleChangeFifteenMinsAlarm}
              checked={eventAlarms?.fifteenMinutes}
            />
            <IonIcon icon={alarm} size="small" />
            15 minutes before
          </IonItem>
          <IonItem lines="none">
            <IonCheckbox
              slot="start"
              aria-label="30 minutes before"
              onIonChange={handleChangeThirtyMinsAlarm}
              checked={eventAlarms?.thirtyMinutes}
            />
            <IonIcon icon={alarm} size="small" />
            30 minutes before
          </IonItem>
        </IonItemGroup>
      </IonCardContent>
    </IonCard>
  );
};

export default CalendarEventCard;
