import { LOGIN_STATE_SUCCESS, LOGIN_SUCCESS } from "../action";

const initState = {
  user: {},
  isLogin: false,
};

export default (state = initState, action: any) => {
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

    default:
      return state;
  }
}
