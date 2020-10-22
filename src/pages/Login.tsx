import {
  IonAvatar,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { LOGIN } from "../redux/action";
import "./Login.css";
class Login extends React.Component<any> {
  state = {
    username: "",
    password: "",
  };
  // 登录
  login() {
    this.props.login(this.state);
  }

  handleChange(e: any, key: string) {
    this.setState({ [key]: e.target.value });
  }

  render() {
    return this.props.isLogin ? (
      <Redirect to="/tab1/1" />
    ) : (
      <IonContent>
        <IonAvatar>
          <img
            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
            alt="avatar"
          />
        </IonAvatar>
        <IonList>
          <IonItem>
            <IonLabel position="floating">用户名</IonLabel>
            <IonInput
              value={this.state.username}
              onIonChange={(e) => this.handleChange(e, "username")}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">密码</IonLabel>
            <IonInput
              value={this.state.password}
              onIonChange={(e) => this.handleChange(e, "password")}
            ></IonInput>
          </IonItem>
          <IonButton
            className="login-btn"
            expand="full"
            onClick={() => this.login()}
          >
            登录{this.props.user.age}
          </IonButton>
        </IonList>
      </IonContent>
    );
  }
}

const toLogin = (user: any) => ({ type: LOGIN, user });
const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (user: any) => dispatch(toLogin(user)),
  };
};

const mapStateToProps = ({ login }: any) => {
  return {
    user: login.user,
    isLogin: login.isLogin
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
