export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_STATE = "LOGIN_STATE";
export const LOGIN_STATE_SUCCESS = "LOGIN_STATE_SUCCESS";
export const LOGIN_STATE_FAILD = "LOGIN_STATE_FAILD";
export const GOODS_UPDATE = "GOODS_UPDATE";
export const GOODS_SUCCESS = "GOODS_SUCCESS";

export const login = (user: any) => {
  return {
    type: LOGIN, user
  };
}

export const loginSuccess = (user: any) => {
  return {
    type: LOGIN_SUCCESS, user
  };
}

export const loginState = () => {
  return {
    type: LOGIN_STATE
  };
}

export const goodsUpdate = () => {
  return {
    type: GOODS_UPDATE
  }
}