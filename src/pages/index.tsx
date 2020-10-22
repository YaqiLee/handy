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
import { LOGIN_STATE } from "../redux/action";
import GoodsCreate from "./GoodsCreate";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";

const loginState = () => ({ type: LOGIN_STATE });
const mapStateToProps = ({ login }: any) => {
  return {
    isLogin: login.isLogin,
    user: login.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginState: () => dispatch(loginState()),
  };
};

class AppHome extends React.Component<any> {
  componentDidMount() {
    // this.props.loginState();
  }

  render() {
    return this.props.isLogin ? (
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
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppHome));
