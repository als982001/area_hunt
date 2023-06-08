import { combineReducers } from "redux";
import userReducer from "./Reducers/userReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["userReducer"],
};

const rootReducer = combineReducers({ userReducer });

export default persistReducer(persistConfig, rootReducer);
