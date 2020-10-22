export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
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

export const goodsUpdate = () => {
  return {
    type: GOODS_UPDATE
  }
}