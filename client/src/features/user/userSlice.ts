import { LatestChat } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  chats: Array<LatestChat>;
  chatSelected: boolean;
  loading: boolean;
  error: null | string;
  passwordUpdateLoading: boolean;
  passwordUpdateError: null | string;
  userDetailsUpdateLoading: boolean;
  userDetailsUpdateError: null | string;
  profilePictureUpdateLoading: boolean;
  profilePictureUpdateError: null | string;
}

const initialState: UserState = {
  chats: [],
  chatSelected: false,
  loading: false,
  error: null,
  passwordUpdateLoading: false,
  passwordUpdateError: null,
  userDetailsUpdateLoading: false,
  userDetailsUpdateError: null,
  profilePictureUpdateLoading: false,
  profilePictureUpdateError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserChatHistoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserChatHistorySuccess(state, action: PayloadAction<Array<LatestChat>>) {
      state.loading = false;
      state.chats = action.payload;
    },
    getUserChatHistoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    toggleChatSelection(state, action: PayloadAction<boolean>) {
      state.chatSelected = action.payload;
    },
    updatePasswordStart(state) {
      state.passwordUpdateLoading = true;
      state.passwordUpdateError = null;
    },
    updatePasswordSuccess(state) {
      state.passwordUpdateLoading = false;
    },
    updatePasswordFailure(state, action: PayloadAction<string>) {
      state.passwordUpdateLoading = false;
      state.passwordUpdateError = action.payload;
    },
    updateUserDetailsStart(state) {
      state.userDetailsUpdateLoading = true;
      state.userDetailsUpdateError = null;
    },
    updateUserDetailsSuccess(state) {
      state.userDetailsUpdateLoading = false;
    },
    updateUserDetailsFailure(state, action: PayloadAction<string>) {
      state.userDetailsUpdateLoading = false;
      state.userDetailsUpdateError = action.payload;
    },
    profilePictureStart(state) {
      state.profilePictureUpdateLoading = true;
      state.profilePictureUpdateError = null;
    },
    profilePictureSuccess(state) {
      state.profilePictureUpdateLoading = false;
    },
    profilePictureFailure(state, action: PayloadAction<string>) {
      state.profilePictureUpdateLoading = false;
      state.profilePictureUpdateError = action.payload;
    },
  },
});

export const {
  getUserChatHistoryStart,
  getUserChatHistorySuccess,
  getUserChatHistoryFailure,
  toggleChatSelection,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
  updateUserDetailsStart,
  updateUserDetailsSuccess,
  updateUserDetailsFailure,
  profilePictureStart,
  profilePictureSuccess,
  profilePictureFailure,
} = userSlice.actions;

export default userSlice.reducer;
