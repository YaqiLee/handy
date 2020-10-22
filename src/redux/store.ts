import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import mySaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
export var store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);
