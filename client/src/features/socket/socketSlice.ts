import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { AppDispatch } from "@/app/store";
import { createSocketConnection } from "@/socketService";

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<Socket | null>) {
      state.socket = action.payload;
    },
    disconnectSocket(state) {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
  },
});

export const initializeSocket =
  (url: string, userId: string) => (dispatch: AppDispatch) => {
    const socket = createSocketConnection(url, userId, dispatch);
    dispatch(setSocket(socket));
  };

export const { setSocket, disconnectSocket } = socketSlice.actions;

export default socketSlice.reducer;
