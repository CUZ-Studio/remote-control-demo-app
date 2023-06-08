import { HYDRATE } from "next-redux-wrapper";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
}

export interface Player {
  objectPath: string;
  displayName: string;
}

export interface AuthState {
  user: User | null;
  player: Player | null;
}

const initialState: AuthState = {
  user: null,
  player: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    assignPlayer(state, action: PayloadAction<Player | null>) {
      state.player = action.payload;
    },
  },
  extraReducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [HYDRATE]: (state, action) => {
      return {
        ...state,
      };
    },
  },
});

export default userSlice.reducer;
export const { authorize, assignPlayer } = userSlice.actions;
