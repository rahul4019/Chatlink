import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatSliceProps {
  selectedUser: null | Omit<User, "email">;
  chats: [];
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
  },
});

export const { setSelectedUser } = chatSlice.actions;

export default chatSlice.reducer;
