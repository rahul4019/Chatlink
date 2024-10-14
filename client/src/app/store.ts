import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.ts";

export const store = configureStore({
  reducer: { authReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
