import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducer/index";
import mySaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
export var store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);
