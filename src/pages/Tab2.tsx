import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import TodoList from '../components/TodoList';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>待办事项</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">待办事项</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TodoList></TodoList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
