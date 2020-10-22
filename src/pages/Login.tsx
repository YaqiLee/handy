import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonRouterLink } from "@ionic/react";
import React from "react";

class Login extends React.Component {
  render() {
    return (
      <>
        <IonPage>
          <IonContent>
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                <IonCardTitle>Card Title</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                  <IonRouterLink href="/tab1/1">link</IonRouterLink>
                Keep close to Nature's heart... and break clear away, once in
                awhile, and climb a mountain or spend a week in the woods. Wash
                your spirit clean.
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      </>
    );
  }
}

export default Login;
