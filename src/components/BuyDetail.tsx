import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React from "react";
import ReactEcharts from "echarts-for-react";

class BuyDetail extends React.Component<any> {
  get summary() {
    return this.props.summary;
  }

  getOption() {
    return {
      //   title: {
      //     text: "ECharts 入门示例",
      //   },
      tooltip: {},
      xAxis: {
        data: ["已购总额", "预购总额"],
      },
      grid: {
        width: "100%"
      },
      yAxis: {},
      series: [
        {
          name: "金额",
          type: "bar",
          data: [this.summary.buy.price, this.summary.bought.price],
        },
      ],
    };
  }

  render() {
    return (
      <>
        <IonModal
          isOpen={this.props.isVisible}
          cssClass="my-custom-class"
          swipeToClose={true}
          onDidDismiss={() => this.props.toggle(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="primary">
                <IonButton
                  color="secondary"
                  onClick={() => this.props.toggle(false)}
                >
                  <IonIcon slot="icon-only" ios={close} md={close} />
                </IonButton>
              </IonButtons>
              <IonTitle>预购清单统计</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel>预购数量</IonLabel>
              <IonBadge slot="end">{this.summary.buy.count}</IonBadge>
            </IonItem>
            <IonItem>
              <IonLabel>预购总额</IonLabel>
              <IonBadge slot="end">￥{this.summary.buy.price}</IonBadge>
            </IonItem>
            <IonItem>
              <IonLabel>已购数量</IonLabel>
              <IonBadge color="success" slot="end">
                {this.summary.bought.count}
              </IonBadge>
            </IonItem>
            <IonItem>
              <IonLabel>已购总额</IonLabel>
              <IonBadge color="success" slot="end">
                ￥{this.summary.bought.price}
              </IonBadge>
            </IonItem>
            <div style={{ padding: "0 16px"}}>
              <ReactEcharts option={this.getOption()} />
            </div>
          </IonContent>
        </IonModal>
      </>
    );
  }
}

export default BuyDetail;
