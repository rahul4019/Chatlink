import { createSlice } from "@reduxjs/toolkit";

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
    chats,
  },
});
