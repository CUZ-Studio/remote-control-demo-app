import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { Action, applyMiddleware, combineReducers, createStore, Middleware } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import game, { GameState } from "./game";
import auth, { AuthState } from "./user";

export interface ReducerState {
  auth: AuthState;
  game: GameState;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bindMiddleware = (middleware: Middleware<any, any, any>[]) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  auth,
  game,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.auth.user) nextState.auth.user = state.auth.user;
    if (state.game.player) nextState.game.player = state.game.player;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () => {
  return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
