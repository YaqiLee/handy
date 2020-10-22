import { GOODS_SUCCESS, LOGIN_SUCCESS } from "./action";

var initState = {
  user: {},
  buys: [],
};

export default function reducer(state = initState, action: any) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { user: action.user });
    case GOODS_SUCCESS:
      return Object.assign({}, state, { buys: action.data });
    
    default:
      return state;
  }
}
