import { HYDRATE } from "next-redux-wrapper";

import { RobotColor, RobotModelType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  uid: string | undefined; // userId와 혼동하지 말 것!
  objectPath: string | undefined;
  headTag: string | undefined;
  model: RobotModelType | undefined;
  color: RobotColor | undefined;
  thisRoundScore: number | undefined;
  allRoundScore: number[] | undefined;
  playedNum: number | undefined;
}

export interface GameRound {
  gameModeBaseObjectPath: string | undefined;
  isGameInProgress: boolean;
  timeLeft: number | null;
}

export interface GameState {
  player: Player | null;
  gameRound: GameRound;
}

const initialState: GameState = {
  player: {
    uid: undefined,
    objectPath: undefined,
    headTag: undefined,
    model: undefined,
    color: undefined,
    thisRoundScore: undefined,
    allRoundScore: undefined,
    playedNum: undefined,
  },
  gameRound: {
    gameModeBaseObjectPath: undefined,
    isGameInProgress: false,
    timeLeft: 0,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    assignPlayer(state, action: PayloadAction<Player | null>) {
      state.player = action.payload;
    },
    updateGameRound(state, action: PayloadAction<GameRound>) {
      state.gameRound = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.game,
      };
    },
  },
});

export default gameSlice.reducer;
export const { assignPlayer, updateGameRound } = gameSlice.actions;
