import { createWrapper } from "next-redux-wrapper";
import { Action, combineReducers } from "redux";
import logger from "redux-logger";
import { ThunkAction } from "redux-thunk";

import { configureStore, PayloadAction } from "@reduxjs/toolkit";

import auth from "./user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    auth,
  })(state, action);
};

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });

const store = makeStore();

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
