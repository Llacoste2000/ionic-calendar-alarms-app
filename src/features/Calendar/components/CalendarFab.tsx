import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { calendar } from "ionicons/icons";
import { calendarStore } from "../calendarStore";
import { observer } from "mobx-react-lite";
import { memo } from "react";

const CalendarFab = memo(() => {
  const handleFetchCalendars = async () => {
    await calendarStore.fetchCalendars();
    calendarStore.setCalendarsActionSheetVisibility(true);
  };

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={handleFetchCalendars}>
        <IonIcon icon={calendar} />
      </IonFabButton>
    </IonFab>
  );
});

export default CalendarFab;
