import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { goodsCount } from "../services/buys.service";

const BuyDetail: React.FC<any> = (props = { timestamp: 0 }) => {

  let [summary, setSummary] = useState<any>({ buy: {}, bought: {} });

  useEffect(() => {
    goodsCount().then((data) => setSummary(data));
  }, [props.timestamp]);

  return (
    <>
      <IonModal
        isOpen={props.isVisible}
        cssClass="my-custom-class"
        swipeToClose={true}
        onDidDismiss={() => props.toggle(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton color="secondary" onClick={() => props.toggle(false)}>
                <IonIcon slot="icon-only" ios={close} md={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>预购清单统计</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel>预购数量</IonLabel>
            <IonBadge slot="end">{summary.buy.count}</IonBadge>
          </IonItem>
          <IonItem>
            <IonLabel>预购总额</IonLabel>
            <IonBadge slot="end">￥{summary.buy.price}</IonBadge>
          </IonItem>
          <IonItem>
            <IonLabel>已购数量</IonLabel>
            <IonBadge color="success" slot="end">{summary.bought.count}</IonBadge>
          </IonItem>
          <IonItem>
            <IonLabel>已购总额</IonLabel>
            <IonBadge color="success" slot="end">￥{summary.bought.price}</IonBadge>
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};

export default BuyDetail;
