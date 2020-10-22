import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import { card, fileTray } from "ionicons/icons";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";
import GoodsCreate from "./GoodsCreate";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";

class AppHome extends React.Component<any> {

  render() {
    return (
      <>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/goods/create" component={GoodsCreate} exact={true} />
            <Route path="/tab1/:id" component={Tab1} exact={true} />
            <Route path="/tab2" component={Tab2} exact={true} />
            <Route
              path="/"
              render={() => <Redirect to="/tab1/1" />}
              exact={true}
            />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1/1">
              <IonIcon icon={card} />
              <IonLabel>欲购清单</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={fileTray} />
              <IonLabel>待办事项</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(withRouter(AppHome));
