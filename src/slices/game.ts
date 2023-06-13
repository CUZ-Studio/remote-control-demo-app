import { HYDRATE } from "next-redux-wrapper";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  id: string;
  objectPath: string;
  displayName: string;
  moveForward: number;
}

export interface GameStatus {
  isPlaying: boolean;
  timeLeft: number | null;
}

export interface GameState {
  player: Player | null;
  gameStatus: GameStatus;
}

const initialState: GameState = {
  player: null,
  gameStatus: {
    isPlaying: false,
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
    updateGameStatus(state, action: PayloadAction<GameStatus>) {
      state.gameStatus = action.payload;
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
export const { assignPlayer, updateGameStatus } = gameSlice.actions;
