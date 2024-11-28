import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserChatHistoryFailure,
  getUserChatHistoryStart,
  getUserChatHistorySuccess,
  updatePasswordFailure,
  updatePasswordStart,
  updatePasswordSuccess,
} from "./userSlice";
import { axiosInstance } from "@/utils/axios";

export const getUserChatHistory = createAsyncThunk(
  "/user/getUserChatHistory",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getUserChatHistoryStart());

      const response = await axiosInstance.get("/chat/chat-history");
      const { chatHistory } = response.data.data;

      dispatch(getUserChatHistorySuccess(chatHistory));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Get user chat history failed";
      dispatch(getUserChatHistoryFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

interface UpdatePasswordArgs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const updatePassword = createAsyncThunk(
  "/user/password",
  async (
    { currentPassword, newPassword, confirmNewPassword }: UpdatePasswordArgs,
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(updatePasswordStart());

      const response = await axiosInstance.patch("/user/password", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      dispatch(updatePasswordSuccess());
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Password update failed";
      dispatch(updatePasswordFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);
