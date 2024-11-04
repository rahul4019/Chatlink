import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { AppDispatch } from "@/app/store";

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

export const initializeSocket = (url: string) => (dispatch: AppDispatch) => {
  const socket = io(url);
  socket.emit("chat:sendMessage", "Hello world");
  dispatch(setSocket(socket));

  socket.on("chat:receiveMessage", (message: any) => {
    console.log("server message: ", message);
  });
};

export const { setSocket, disconnectSocket } = socketSlice.actions;

export default socketSlice.reducer;
