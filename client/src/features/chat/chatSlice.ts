import { createSlice } from "@reduxjs/toolkit";

interface ChatSliceProps {
  chats: [];
  loading: boolean;
  error: null | string;
}

const initialState: ChatSliceProps = {
  chats: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {},
});

export default chatSlice.reducer;
