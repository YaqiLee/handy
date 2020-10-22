import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { GOODS_UPDATE } from "../redux/action";
import { saveGoods } from "../services/buys.service";
import "./GoodsCreate.css";

class GoodsCreate extends React.Component<any> {
  state = {
    name: "",
    price: "",
    order: 0,
  };

  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    saveGoods(this.state).then((res: any) => {
      this.props.updateGoods({ bought: 0 });
      this.props.history.push("/tab1/3");
    });
  }

  handleChange(event: any, k: string) {
    this.setState({ [k]: event.target.value });
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>添加预购商品</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">名称</IonLabel>
              <IonInput
                value={this.state.name}
                onIonChange={(e) => this.handleChange(e, "name")}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">价格</IonLabel>
              <IonInput
                value={this.state.price}
                onIonChange={(e) => this.handleChange(e, "price")}
                type="number"
              />
            </IonItem>
          </IonList>
          <IonButton
            className="footer-btn"
            expand="full"
            onClick={this.handleSubmit}
          >
            确认添加
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }
}

const _updateGoods = (params: any) => ({ type: GOODS_UPDATE, params });
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateGoods: (params: any) => dispatch(_updateGoods(params)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(GoodsCreate));
