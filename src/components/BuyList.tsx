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
import React, { useState } from "react";
import "./BuyList.css";

type TouchEvent = React.TouchEvent<HTMLIonItemElement>;

const BuyList: React.FC<any> = () => {
  let isTouch = false;
  let touchStartTime = 0;
  let [touchs, setTouchs] = useState<any>({});
  let [dragIndex, setDragIndex] = useState(-1);

  //   let [data, setData] = useState([
  //     {
  //       title: "iphone 12",
  //       price: "1299",
  //     },
  //     {
  //       title: "华为mate30 pro",
  //       price: "2999",
  //     },
  //     {
  //       title: "一加8t",
  //       price: "999",
  //     },
  //   ]);
  let [data, setData] = useState<any>([]);

  let timer = (touchStartTime: any, index: number) => {
    if (!isTouch) return;

    if (Date.now() - touchStartTime >= 1000) {
      setDragIndex(index);
      return false;
    }

    requestAnimationFrame(() => timer(touchStartTime, index));
  };

  let onTouchStart = (e: TouchEvent, index: number) => {
    isTouch = true;
    touchStartTime = Date.now();
    setTouchs(e.currentTarget.getClientRects()[0]);
    timer(touchStartTime, index);
  };

  let onTouchEnd = (e: TouchEvent) => {
    isTouch = false;
    // 重置开始时间
    touchStartTime = 0;
    // 重置选中
    setDragIndex(-1);
  };

  let onTouchMove = (e: TouchEvent) => {
    const currentY = e.targetTouches[0].pageY;
    const startPos = touchs.y;
    const distance = currentY - startPos;

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

  let renderList = () => {
    return (
      <IonList>
        {data.map((it: any, i: any) => (
          <IonItemSliding key={i}>
            <IonItem
              className={
                dragIndex === i ? "drag-start dragable-item" : "dragable-item"
              }
              onTouchStart={(e) => onTouchStart(e, i)}
              onTouchEnd={(e) => onTouchEnd(e)}
              onTouchMove={(e) => onTouchMove(e)}
            >
              <IonLabel>{it.title}</IonLabel>
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
        ))}
      </IonList>
    );
  };

  let renderEmpty = () => {
    return <ExploreContainer></ExploreContainer>;
  };

  return data.length > 0 ? renderList() : renderEmpty();
};

export default BuyList;
