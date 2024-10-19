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
  usernameCheckFailure,
  usernameCheckStart,
  usernameCheckSuccess,
} from "./authSlice";

interface SignupArgs {
  username: string;
  email: string;
  password: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

export const checkUsernameAvailability = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  "auth/checkUsernameAvailability",
  async (username: string, { dispatch, rejectWithValue }) => {
    dispatch(usernameCheckStart());
    try {
      const response = await axiosInstance.get(
        `/user/unique-username?username=${username}`,
      );
      console.log(response);
      dispatch(usernameCheckSuccess());
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Server error";
      dispatch(usernameCheckFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const signupUser = createAsyncThunk<
  void,
  SignupArgs,
  { rejectValue: string }
>(
  "auth/signup",
  async (
    { username, email, password }: SignupArgs,
    { dispatch, rejectWithValue },
  ) => {
    dispatch(signupStart());
    try {
      await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      dispatch(signupSuccess());
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      dispatch(signupFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk<void, LoginArgs>(
  "auth/login",
  async ({ email, password }: LoginArgs, { dispatch, rejectWithValue }) => {
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
      const errorMessage = error.response?.data?.message || "Signup failed";
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
      return rejectWithValue(errorMessage);
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
