import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.ts";
import dialogReducer from "../features/dialog/dialogSlice.ts";
import userReducer from "../features/user/userSlice.ts";

export const store = configureStore({
  reducer: { auth: authReducer, dialog: dialogReducer, user: userReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
