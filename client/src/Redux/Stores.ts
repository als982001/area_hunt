import { legacy_createStore as createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./index";

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
