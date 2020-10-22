import { GOODS_SUCCESS } from "../action";

const initState = {
  buys: [],
};

export default (state = initState, action: any) => {
  switch (action.type) {
    case GOODS_SUCCESS:
      return Object.assign({}, state, { buys: action.data });
    default:
      return state;
  }
};
