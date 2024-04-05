import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonActionSheet,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import "./ExploreContainer.css";
import { observer } from "mobx-react-lite";
import { calendarStore } from "../../../features/Calendar/calendarStore";
import { useEffect, useState } from "react";
import { calendar } from "ionicons/icons";
import CalendarEventList from "../../../features/Events/components/EventList";
import React from "react";

const ExploreContainer: React.FC = observer(() => {
  const [showActionSheet, setShowActionSheet] = useState(false);

  const handleFetchCalendars = async () => {
    await calendarStore.fetchCalendars();
    setShowActionSheet(true);
  };

  const handleSelectCalendar = async (calendarId: number) => {
    calendarStore.selectCalendar(calendarId);
    await calendarStore.fetchSelectedCalendarEvents(calendarId);
    setShowActionSheet(false);
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={handleFetchCalendars}>
          <IonIcon icon={calendar} />
        </IonFabButton>
      </IonFab>
      <IonActionSheet
        isOpen={showActionSheet}
        header="Select a calendar"
        buttons={calendarStore.filteredCalendars.map((calendar) => ({
          text: calendar.name,
          handler: () => handleSelectCalendar(calendar.id),
        }))}
        onDidDismiss={() => setShowActionSheet(false)}
      />
      {calendarStore.selectedCalendar !== null ? (
        <CalendarEventList />
      ) : (
        <IonCard>
          <IonCardHeader class="ion-text-center">
            <IonCardTitle>Select a calendar</IonCardTitle>
          </IonCardHeader>
          <IonCardContent class="ion-text-center">
            <IonButton onClick={handleFetchCalendars} className="button-full">
              Fetch calendars
            </IonButton>
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
});

export default ExploreContainer;
