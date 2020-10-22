import { IonApp, IonPage, IonRouterOutlet } from "@ionic/react";
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
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AppHome from "./pages";
import Login from "./pages/Login";
import { loginStatus } from "./services/user.service";
/* Theme variables */
import "./theme/variables.css";
const App: React.FC<any> = (props) => {

  return (
    <IonApp>
      <IonPage>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* switch 作用是只匹配一个路由，相反会匹配所有路由对应的页面 */}
            <Switch>
              <Route path="/login" component={Login} exact />
              <Route path="/" component={AppHome} />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonPage>
    </IonApp>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(App);
