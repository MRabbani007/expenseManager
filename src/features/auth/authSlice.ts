import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface AuthState {
  username: string | null;
  roles: number[] | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  username: null,
  roles: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { username, roles, token } = action.payload;
      return { ...state, username, roles, token };
    },
    clearCredentials: (state) => {
      return { ...state, username: null, roles: null, token: null };
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectAuth = (state: RootState) => state?.auth;

export default authSlice.reducer;
