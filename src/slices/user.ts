import { HYDRATE } from "next-redux-wrapper";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  uid: string;
  displayName: string;
}

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export default userSlice.reducer;
export const { authorize } = userSlice.actions;
