import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  username: string;
  profilePicture?: string;
  statusMessage?: string;
  is_online?: boolean;
  last_seen?: Date;
}

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  loading: boolean;
  error: null | string;
  isUsernameAvailable: boolean;
  usernameError: null | string;
  loadingUsername: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  isUsernameAvailable: false,
  usernameError: null,
  loadingUsername: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state) {
      state.loading = false;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutStart(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    usernameCheckStart(state) {
      state.loadingUsername = true;
      state.usernameError = null;
    },
    usernameCheckSuccess(state) {
      state.loadingUsername = false;
      state.isUsernameAvailable = true;
    },
    usernameCheckFailure(state, action: PayloadAction<string>) {
      state.loadingUsername = false;
      state.usernameError = action.payload;
      state.isUsernameAvailable = false;
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  setUser,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  usernameCheckStart,
  usernameCheckSuccess,
  usernameCheckFailure,
} = authSlice.actions;

export default authSlice.reducer;
