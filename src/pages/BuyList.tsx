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
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import {
  batchUpdateGoods,
  deleteGoodsById,
  getGoods,
  goodsCount,
  updateGoods,
} from "../services/buys.service";
import BuyDetail from "./BuyDetail";
import "./BuyList.css";
import ExploreContainer from "../components/EmptyPage";

const BuyList: React.FC<any> = (props: any) => {
  // let [touchStartTime, setTouchStartTime] = useState(0);
  let [isSort, setSort] = useState(true);
  let [data, setData] = useState<any>([]);
  // 显示统计页面
  let [isVisible, setIsVisible] = useState<boolean>(false);
  // 是否显示toast
  let [showToast1, setShowToast1] = useState(false);
  // toast文本
  let [toastText, setToastText] = useState("");
  let [summary, setSummary] = useState({ buy: {}, bought: {} });

  // 删除
  let onDelete = (it: any) => {
    deleteGoodsById(it.id).then((res) => {
      setData(data.filter((res: any) => res.id !== it.id));
    });
  };
  // 切换显示统计页面
  let toggleModal = (visible: boolean) => {
    setIsVisible(visible);
  };
  let onSort = (sort = !isSort) => {
    setSort(sort);
  };
  // 交换数据
  let swap = (origin: any, fromIndex: number, toIndex: number) => {
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
  };

  let onBuy = ({ id }: any) => {
    updateGoods({ id, bought: 1 }).then(({ data }: any) => {
      if (data.affected === 0) {
        setToastText("未更新成功");
      } else {
        setToastText("已加入已购");
        getGoodsFunc();
      }
      setShowToast1(true);
    });
  };

  let getGoodsFunc = (bought = 0) => {
    getGoods(bought).then((res: any) => setData(res));
  };
  let getGoodsCount = () => {
    goodsCount().then((data: any) => setSummary(data));
  };

  let onShowDetail = () => {
    getGoodsCount();
    toggleModal(true);
  };

  // 第一次更新获取商品数据
  let history = useIonRouter();

  // 第二个参数： 根据第二个参数是否变化，调用useEffect
  useEffect(() => {
    getGoodsFunc();
  }, [history.routeInfo.id]);

  let doReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    batchUpdateGoods(swap(data, event.detail.from, event.detail.to));
    event.detail.complete();
    setSort(true);
  };

  let color = (money: number): string => {
    if (money > 0 && money < 100) return "primary";
    else if (money >= 100 && money < 500) return "warning";
    else if (money >= 500) return "danger";
    return "dark";
  };

  let renderList = () => {
    return (
      <>
        <IonReorderGroup disabled={isSort} onIonItemReorder={doReorder}>
          {data.map(
            (it: any, i: any) =>
              it && (
                <IonReorder key={i}>
                  <IonItemSliding>
                    <IonItem routerLink="/tab2">
                      <IonLabel>{it.name}</IonLabel>
                      <IonNote color={color(it.price)} slot="end">
                        {it.price}元
                      </IonNote>
                    </IonItem>

                    <IonItemOptions side="end">
                      <IonItemOption
                        color="danger"
                        onClick={() => onDelete(it)}
                      >
                        删除
                      </IonItemOption>
                      <IonItemOption color="success" onClick={() => onBuy(it)}>
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
  };

  let renderEmpty = () => {
    return <ExploreContainer></ExploreContainer>;
  };

  return (
    <>
      <IonListHeader>
        {data.length > 0 && (
          <IonChip outline={true} color="tertiary" onClick={() => onSort()}>
            <IonLabel>{isSort ? "调整顺序" : "排序结束"}</IonLabel>
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
        <IonChip outline={true} color="primary" onClick={() => onShowDetail()}>
          <IonLabel>数据统计</IonLabel>
        </IonChip>
      </IonListHeader>

      <BuyDetail isVisible={isVisible} toggle={toggleModal} summary={summary} />

      <IonToast
        isOpen={showToast1}
        color="primary"
        onDidDismiss={() => setShowToast1(false)}
        message={toastText}
        duration={200}
      />
      {data.length > 0 ? renderList() : renderEmpty()}
    </>
  );
};

export default withRouter(BuyList);
