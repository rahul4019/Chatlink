import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "./authSlice";

interface loginArgs {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<void, loginArgs>(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch },
  ) => {
    dispatch(loginStart());
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { user } = response.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
    }
  },
);

export const logoutUser = createAsyncThunk<void>(
  "auth/logout",
  async (_, { dispatch }) => {
    dispatch(logoutStart());
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("user");
      dispatch(logoutSuccess());
    } catch (error: any) {
      dispatch(logoutFailure(error.response?.data?.message || "Logout failed"));
    }
  },
);
