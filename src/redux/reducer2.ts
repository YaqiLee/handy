import { GOODS_SUCCESS, LOGIN_STATE_SUCCESS, LOGIN_SUCCESS } from "./action";

var initState = {
  user: {},
  isLogin: false,
  buys: [],
};

export default function reducer(state = initState, action: any) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLogin: true,
      };
    case LOGIN_STATE_SUCCESS:
      return {
        ...state,
        user: action.data,
        isLogin: true,
      };
    case GOODS_SUCCESS:
      return Object.assign({}, state, { buys: action.data });

    default:
      return state;
  }
}
