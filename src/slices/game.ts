import { HYDRATE } from "next-redux-wrapper";

import { RobotColor, RobotModelType, TimeSchedule } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  uid: string | null; // userId와 혼동하지 말 것!
  objectPath: string | null;
  headTag: string | null;
  modelType: RobotModelType | null;
  modelColor: RobotColor | null;
  highestRankEver: number | null;
  thisRoundScore: number | null;
  allRoundScore: {
    [key: string]: number;
  } | null;
  playedNum: number | null;
  gotFirstPlace: number | null;
}

export interface GameRound {
  gameModeBaseObjectPath: string | null;
  isGameInProgress: boolean;
  currentTimeSchedule: TimeSchedule | null;
  timeLeft: number | null;
  currentRoundName: string | null;
  thisRoundBestPlayerUID: string | null;
}

export interface GameState {
  player: Player | null;
  gameRound: GameRound;
}

const initialState: GameState = {
  player: {
    uid: null,
    objectPath: null,
    headTag: null,
    modelType: null,
    modelColor: null,
    highestRankEver: null,
    thisRoundScore: null,
    allRoundScore: null,
    playedNum: null,
    gotFirstPlace: null,
  },
  gameRound: {
    gameModeBaseObjectPath: null,
    isGameInProgress: false,
    currentTimeSchedule: null,
    timeLeft: 0,
    currentRoundName: null,
    thisRoundBestPlayerUID: null,
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
