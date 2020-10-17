import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonFab,
  IonFabButton,
  IonFabList,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { card, fileTray, addOutline } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={card} />
            <IonLabel>欲购清单</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={fileTray} />
            <IonLabel>待办事项</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    <IonFab vertical="bottom" horizontal="end" style={{ marginBottom: "44px" }}>
      <IonFabButton>
        <IonIcon icon={addOutline} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton>
          <IonIcon icon={card} />
        </IonFabButton>
        <IonFabButton>
          <IonIcon icon={fileTray} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  </IonApp>
);

export default App;
