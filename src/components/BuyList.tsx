import {
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import ExploreContainer from "./EmptyPage";
import React, { useEffect, useState } from "react";
import "./BuyList.css";
import { getGoods } from "../services/buys.service";

type TouchEvent = React.TouchEvent<HTMLIonItemElement>;

const BuyList: React.FC<any> = () => {
  let [touchs, setTouchs] = useState<any>({});
  let [dragIndex, setDragIndex] = useState(-1);
  // let [touchStartTime, setTouchStartTime] = useState(0);
  
  let [data, setData] = useState<any>([]);
  let [press, setPress] = useState<any>();

  let onTouchStart = (e: TouchEvent, index: number) => {

    let itemTimeout = setTimeout(() => {
      setDragIndex(index);
    }, 1000);

    setPress(itemTimeout)
    setTouchs(e.currentTarget.getClientRects()[0]);
  };

  let onTouchEnd = (e: TouchEvent) => {
    clearTimeout(press)
    // 重置选中
    setDragIndex(-1);
  };

  let onTouchMove = (e: TouchEvent) => {
    const currentY = e.targetTouches[0].pageY;
    const startPos = touchs.y;
    const distance = currentY - startPos;

    if (dragIndex === -1) return;
    // 向下拖动
    let list = data;
    if (distance > 44 && dragIndex + 1 < data.length) {
      let d = list[dragIndex];
      list[dragIndex] = list[dragIndex + 1];
      list[dragIndex + 1] = d;

      touchs.y = touchs.y + 44;
    }

    if (distance < -22 && dragIndex - 1 >= 0) {
      let d = list[dragIndex];
      list[dragIndex] = list[dragIndex - 1];
      list[dragIndex - 1] = d;

      touchs.y = touchs.y - 44;
    }
    setData(list);
    setTouchs(touchs);
  };

  useEffect(() => {
    getGoods().then((res) => setData(res));
  }, []);

  let renderList = () => {
    return (
      <IonList>
        {data.map(
          (it: any, i: any) =>
            it && (
              <IonItemSliding key={i}>
                <IonItem
                  className={
                    dragIndex === i
                      ? "dragable-item drag-start"
                      : "dragable-item"
                  }
                  onTouchStart={(e) => onTouchStart(e, i)}
                  onTouchEnd={(e) => onTouchEnd(e)}
                  onTouchMove={(e) => onTouchMove(e)}
                >
                  <IonLabel>{it.name}</IonLabel>
                  <IonNote color="Primary" slot="end">
                    {it.price}
                  </IonNote>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => console.log("unread clicked")}
                  >
                    删除
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            )
        )}
      </IonList>
    );
  };

  let renderEmpty = () => {
    return <ExploreContainer></ExploreContainer>;
  };

  return data.length > 0 ? renderList() : renderEmpty();
};

export default BuyList;
