import { call, put, takeLatest } from "redux-saga/effects";
import { getGoods } from "../services/buys.service";
import { login } from "../services/user.service";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, GOODS_UPDATE, GOODS_SUCCESS } from "./action";

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

function* mySaga() {
  yield takeLatest(LOGIN, loginUser);

  yield takeLatest(GOODS_UPDATE, fetchGoods);
}

export default mySaga;
