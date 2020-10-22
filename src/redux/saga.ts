import { call, put, takeLatest } from "redux-saga/effects";
import { getGoods } from "../services/buys.service";
import { login, loginStatus } from "../services/user.service";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GOODS_UPDATE,
  GOODS_SUCCESS,
  LOGIN_STATE_SUCCESS,
  LOGIN_STATE_FAILD,
  LOGIN_STATE,
} from "./action";

function* loginUser({ user }: any) {
  try {
    let data = yield call(login, user);
    yield put({ type: LOGIN_SUCCESS, user: data });
  } catch (error) {
    yield put({ type: LOGIN_FAIL });
  }
}

function* fetchGoods({ params }: any) {
  try {
    let data = yield call(getGoods, params.bought);
    console.log(data);
    yield put({ type: GOODS_SUCCESS, data });
  } catch (error) {}
}

function* loginState() {
  try {
    let data = yield call(loginStatus);
    if (data) {
      yield put({ type: LOGIN_STATE_SUCCESS, data });
    } else {
      yield put({ type: LOGIN_STATE_FAILD });
    }
  } catch (error) {}
}

function* mySaga() {
  yield takeLatest(LOGIN, loginUser);

  yield takeLatest(GOODS_UPDATE, fetchGoods);

  yield takeLatest(LOGIN_STATE, loginState);
}

export default mySaga;
