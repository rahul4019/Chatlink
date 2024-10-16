import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  signupFailure,
  signupStart,
  signupSuccess,
} from "./authSlice";

interface signupArgs {
  username: string;
  email: string;
  password: string;
}

interface loginArgs {
  email: string;
  password: string;
}

export const signupUser = createAsyncThunk<void, signupArgs>(
  "auth/signup",
  async ({ username, email, password }: signupArgs, { dispatch }) => {
    dispatch(signupStart());
    try {
      await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      dispatch(signupSuccess());
    } catch (error: any) {
      dispatch(signupFailure(error.response?.data?.message || "Signup failed"));
    }
  },
);

export const loginUser = createAsyncThunk<void, loginArgs>(
  "auth/login",
  async ({ email, password }: loginArgs, { dispatch }) => {
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
