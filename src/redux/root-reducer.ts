import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import dataReducer from "./data/data.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const appReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
