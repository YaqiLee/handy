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
import {
  deleteGoodsById,
  getGoods,
  updateGoodsOrder,
} from "../services/buys.service";

type TouchEvent = React.TouchEvent<HTMLIonItemElement>;

const BuyList: React.FC<any> = (props: any) => {
  let [touchs, setTouchs] = useState<any>({});
  let [dragIndex, setDragIndex] = useState(-1);
  // let [touchStartTime, setTouchStartTime] = useState(0);

  let [data, setData] = useState<any>([]);
  let [press, setPress] = useState<any>();
  let [distance, setDistance] = useState<any>(0);

  let onTouchStart = (e: TouchEvent, index: number) => {
    let itemTimeout = setTimeout(() => {
      setDragIndex(index);
    }, 1000);

    setPress(itemTimeout);
    setTouchs(e.currentTarget.getClientRects()[0]);
  };

  let onTouchEnd = (e: TouchEvent) => {

    if(dragIndex === -1) {
      return false;
    }

    let list = data;
    let rows = Math.floor(distance / 44);

    let upMoveRows = dragIndex + rows;

    if (rows > 0 && upMoveRows < data.length) {
      updateData(swap(list, dragIndex, upMoveRows));
    }

    let downMoveRows = dragIndex + rows;
    if (rows < 0 && downMoveRows >= 0) {
      updateData(swap(list, dragIndex, downMoveRows));

    }

    clearTimeout(press);
    // 重置选中
    setDragIndex(-1);
  };

  let onTouchMove = (e: TouchEvent) => {
    const currentY = e.targetTouches[0].pageY;
    const startPos = touchs.y;

    setDistance(currentY - startPos);
  };

  let updateData = ({ from, to }: any) => {
    updateGoodsOrder(from).then((res) => {});
    updateGoodsOrder(to).then((res) => {});
  };

  let onDelete = (it: any) => {
    console.log(it);
    
    deleteGoodsById(it.id).then((res) => {
      setData(data.filter((res: any) => res.id !== it.id));
    });
  };

  let swap = (origin: any, fromIndex: number, toIndex: number) => {
    let from = origin[fromIndex];
    let { order } = origin[toIndex];

    origin[fromIndex] = origin[toIndex];
    origin[fromIndex].order = from.order;
    origin[toIndex] = from;
    origin[toIndex].order = order;

    return {
      from: origin[fromIndex],
      to: origin[toIndex],
    };
  };
  // 第二个参数： 根据第二个参数是否变化，调用useEffect
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
                  <IonItemOption color="danger" onClick={() => onDelete(it)}>
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
