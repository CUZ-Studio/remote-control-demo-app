import { createWrapper, MakeStore } from "next-redux-wrapper";
import { combineReducers, Store } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  Action,
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";

import game, { GameState } from "./game";
import auth, { AuthState } from "./user";

export interface ReducerState {
  auth: AuthState;
  game: GameState;
}

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth,
  game,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== "production",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const setupStore = (_ctx: any): EnhancedStore => store;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeStore: MakeStore<any> = (context: any) => setupStore(context);
export const persistor = persistStore(store);
export const wrapper = createWrapper<Store>(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
