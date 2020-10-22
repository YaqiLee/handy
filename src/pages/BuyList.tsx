import { ItemReorderEventDetail } from "@ionic/core";
import {
  IonChip,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonListHeader,
  IonNote,
  IonReorder,
  IonReorderGroup,
  IonRouterLink,
  IonToast,
} from "@ionic/react";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ExploreContainer from "../components/EmptyPage";
import { GOODS_SUCCESS } from "../redux/action";
import {
  batchUpdateGoods,
  deleteGoodsById,
  getGoods,
  goodsCount,
  updateGoods,
} from "../services/buys.service";
import BuyDetail from "./BuyDetail";
import "./BuyList.css";

class BuyList extends React.Component<any> {
  state: any = {};
  constructor(props: any) {
    super(props);

    this.state = {
      isSort: true,
      data: [],
      isVisible: false,
      showToast1: false,
      toastText: "",
      summary: { buy: {}, bought: {} },
    };
  }

  onDelete(it: any) {
    deleteGoodsById(it.id).then((res) => {
      let goods = this.props.buys.filter((res: any) => res.id !== it.id);
      this.props.updateGoods(goods);
    });
  }

  // 切换显示统计页面
  toggleModal(visible: boolean) {
    this.setState({ isVisible: visible });
  }
  onSort(sort = !this.state.isSort) {
    this.setState({ isSort: sort });
  }

  swap(origin: any, fromIndex: number, toIndex: number) {
    let list: any[] = [...origin],
      arr = [];
    for (let i = fromIndex; i < toIndex; i++) {
      let temp = list[i];
      list[i + 1].order = list[i + 1].order - 1;
      list[i] = list[i + 1];
      list[i + 1] = temp;

      arr.push(list[i]);

      if (i === toIndex - 1) {
        list[i + 1].order = list[i].order + 1;
        arr.push(list[i + 1]);
      }
    }

    return arr;
  }

  onBuy({ id }: any) {
    updateGoods({ id, bought: 1 }).then(({ data }: any) => {
      if (data.affected === 0) {
        this.setState({ toastText: "未更新成功" });
      } else {
        this.setState({ toastText: "已加入已购" });
        this.getGoodsFunc();
      }
      this.setState({ showToast1: true });
    });
  }

  getGoodsFunc(bought = 0) {
    getGoods(bought).then((res: any) => this.props.updateGoods(res));
  }

  getGoodsCount() {
    goodsCount().then((summary: any) => this.setState({ summary }));
  }

  onShowDetail() {
    this.getGoodsCount();
    this.toggleModal(true);
  }

  componentDidMount() {
    this.getGoodsFunc();
  }

  doReorder(event: CustomEvent<ItemReorderEventDetail>) {
    batchUpdateGoods(
      this.swap(this.props.buys, event.detail.from, event.detail.to)
    );
    event.detail.complete();
    this.setState({ isSort: true });
  }

  color(money: number): string {
    if (money > 0 && money < 100) return "primary";
    else if (money >= 100 && money < 500) return "warning";
    else if (money >= 500) return "danger";
    return "dark";
  }

  get hasData() {
    return this.props.buys.length > 0;
  }

  renderList() {
    return (
      <>
        <IonReorderGroup
          disabled={this.state.isSort}
          onIonItemReorder={(e) => this.doReorder(e)}
        >
          {this.props.buys.map(
            (it: any, i: any) =>
              it && (
                <IonReorder key={i}>
                  <IonItemSliding>
                    <IonItem routerLink="/tab2">
                      <IonLabel>{it.name}</IonLabel>
                      <IonNote color={this.color(it.price)} slot="end">
                        {it.price}元
                      </IonNote>
                    </IonItem>

                    <IonItemOptions side="end">
                      <IonItemOption
                        color="danger"
                        onClick={() => this.onDelete(it)}
                      >
                        删除
                      </IonItemOption>
                      <IonItemOption
                        color="success"
                        onClick={() => this.onBuy(it)}
                      >
                        已购
                      </IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                </IonReorder>
              )
          )}
        </IonReorderGroup>
      </>
    );
  }

  renderEmpty() {
    return <ExploreContainer></ExploreContainer>;
  }

  render() {
    return (
      <>
        <IonListHeader>
          {this.hasData && (
            <IonChip
              outline={true}
              color="tertiary"
              onClick={() => this.onSort()}
            >
              <IonLabel>{this.state.isSort ? "调整顺序" : "排序结束"}</IonLabel>
            </IonChip>
          )}
          <IonChip outline={true} color="primary">
            <IonLabel>
              <IonRouterLink routerLink="/tab2">已购商品</IonRouterLink>
            </IonLabel>
          </IonChip>
          <IonChip outline={true} color="primary">
            <IonLabel>
              <IonRouterLink routerLink="/goods/create">新增预购</IonRouterLink>
            </IonLabel>
          </IonChip>
          <IonChip
            outline={true}
            color="primary"
            onClick={() => this.onShowDetail()}
          >
            <IonLabel>数据统计</IonLabel>
          </IonChip>
        </IonListHeader>

        <BuyDetail
          isVisible={this.state.isVisible}
          toggle={(visible: boolean) => this.toggleModal(visible)}
          summary={this.state.summary}
        />

        <IonToast
          isOpen={this.state.showToast1}
          color="primary"
          onDidDismiss={() => this.setState({ showToast1: false })}
          message={this.state.toastText}
          duration={200}
        />
        {this.hasData ? this.renderList() : this.renderEmpty()}
      </>
    );
  }
}
const mapStateToProps = ({ good }: any) => {
  return {
    buys: good.buys,
  };
};

const _updateGoods = (data: any) => ({ type: GOODS_SUCCESS, data });
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateGoods: (data: any) => dispatch(_updateGoods(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BuyList));
