import { HYDRATE } from "next-redux-wrapper";

import { Status } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  objectPath: string;
  displayName: string;
}

export interface GameState {
  player: Player | null;
  status: Status;
}

const initialState: GameState = {
  player: null,
  status: "idle",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    assignPlayer(state, action: PayloadAction<Player | null>) {
      state.player = action.payload;
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
export const { assignPlayer } = gameSlice.actions;
