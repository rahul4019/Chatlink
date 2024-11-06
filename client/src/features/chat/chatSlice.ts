import { User } from "@/types/user";
import { Message } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatSliceProps {
  selectedUser: null | Omit<User, "email">;
  chats: Message[];
  loading: boolean;
  error: null | string;
}

const initialState: ChatSliceProps = {
  selectedUser: null,
  chats: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chatSelected",
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<Omit<User, "email">>) {
      state.selectedUser = action.payload;
    },
    getChatsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getChatsSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.chats = action.payload;
    },
    getChatsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addMessage(state, action: PayloadAction<any>) {
      console.log("payload: ", action.payload);
      state.chats.push(action.payload);
    },
  },
});

export const {
  setSelectedUser,
  getChatsStart,
  getChatsSuccess,
  getChatsFailure,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
