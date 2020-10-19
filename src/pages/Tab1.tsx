import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import BuyList from '../components/BuyList';
import './Tab1.css';

const Tab1: React.FC<any> = () => {
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
        <BuyList/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
