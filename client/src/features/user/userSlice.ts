import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  chats: [];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  chats: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserChatHistoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserChatHistorySuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.chats = action.payload;
    },
    getUserChatHistoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUserChatHistoryStart,
  getUserChatHistorySuccess,
  getUserChatHistoryFailure,
} = userSlice.actions;

export default userSlice.reducer;
