import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserChatHistoryFailure,
  getUserChatHistoryStart,
  getUserChatHistorySuccess,
  profilePictureFailure,
  profilePictureStart,
  profilePictureSuccess,
  updatePasswordFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updateUserDetailsFailure,
  updateUserDetailsStart,
  updateUserDetailsSuccess,
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

      await axiosInstance.patch("/user/password", {
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

interface updateUserDetails {
  statusMessage: string;
  username: string;
}

export const updateUserDetails = createAsyncThunk(
  "/user/details",
  async (
    { username, statusMessage }: updateUserDetails,
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(updateUserDetailsStart());

      await axiosInstance.patch("/user/details", {
        username,
        statusMessage,
      });

      dispatch(updateUserDetailsSuccess());
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Password update failed";
      dispatch(updateUserDetailsFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const profilePictureUpdate = createAsyncThunk(
  "/user/profile-picture",
  async (image: File, { dispatch, rejectWithValue }) => {
    try {
      dispatch(profilePictureStart());

      const formData = new FormData();
      formData.append("profile_picture", image);

      await axiosInstance.post("/user/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(profilePictureSuccess());
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Picture upload failed";
      dispatch(profilePictureFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);
