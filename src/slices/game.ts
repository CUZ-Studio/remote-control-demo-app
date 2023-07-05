import { HYDRATE } from "next-redux-wrapper";

import { RobotColor, RobotModelType, TimeSchedule } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  uid: string | undefined; // userId와 혼동하지 말 것!
  objectPath: string | undefined;
  headTag: string | undefined;
  modelType: RobotModelType | undefined;
  modelColor: RobotColor | undefined;
  highestRankEver: number | undefined;
  thisRoundScore: number | undefined;
  allRoundScore:
    | {
        [key: string]: number;
      }
    | undefined;
  playedNum: number | undefined;
  gotFirstPlace: number | undefined;
}

export interface GameRound {
  gameModeBaseObjectPath: string | undefined;
  isGameInProgress: boolean;
  currentTimeSchedule: TimeSchedule | undefined;
  timeLeft: number | null;
  currentRoundName: string | undefined;
  thisRoundBestPlayerUID: string | undefined;
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
    modelType: undefined,
    modelColor: undefined,
    highestRankEver: undefined,
    thisRoundScore: undefined,
    allRoundScore: undefined,
    playedNum: undefined,
    gotFirstPlace: undefined,
  },
  gameRound: {
    gameModeBaseObjectPath: undefined,
    isGameInProgress: false,
    currentTimeSchedule: undefined,
    timeLeft: 0,
    currentRoundName: undefined,
    thisRoundBestPlayerUID: undefined,
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
