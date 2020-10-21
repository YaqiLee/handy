import {
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonHeader,
    IonIcon,
    IonPage,

    IonTitle,
    IonToolbar
} from "@ionic/react";
import {
    addOutline,
    chevronUpCircleOutline,

    swapVertical
} from "ionicons/icons";
import React from "react";
import { withRouter } from "react-router-dom";
import BuyList from "./BuyList";
import "./Tab1.css";

const Tab1: React.FC<any> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>欲购清单</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">欲购清单</IonTitle>
          </IonToolbar>
        </IonHeader>
        <BuyList />
      </IonContent>
      <IonFab hidden vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={chevronUpCircleOutline} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton>
            <IonIcon icon={addOutline} onClick={ () => props.history.push("/goods/create") }/>
          </IonFabButton>
          <IonFabButton>
            <IonIcon icon={swapVertical} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonPage>
  );
};

export default withRouter(Tab1);
