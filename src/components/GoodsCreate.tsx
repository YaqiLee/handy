import {
  IonInput,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
} from "@ionic/react";
import React from "react";
import { saveGoods } from "../services/buys.service";
import "./GoodsCreate.css";

class GoodsCreate extends React.Component {
  state = {
    name: "",
    price: "",
  };

  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(this.state);
    saveGoods(this.state).then(res => {
        console.log(res);
        
    })
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

export default GoodsCreate;
