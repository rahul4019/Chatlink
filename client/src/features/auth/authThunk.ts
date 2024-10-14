import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginFailure, loginStart, loginSuccess } from "./authSlice";

export const loginUser = createAsyncThunk(
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
