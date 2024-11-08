import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { sendMessage, typingIndicator } from "@/socketService";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { toggleTypingStatus } from "@/features/chat/chatSlice";

type ChatInputProps = {
  selectedUser: {
    id: string;
    username: string;
    profilePicture: string;
  };
};

const ChatInput = ({ selectedUser }: ChatInputProps) => {
  const [typing, setTyping] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { socket } = useAppSelector((state) => state.socket);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on("chat:typing", (data) => {
        if (data.isTyping) {
          dispatch(toggleTypingStatus(true));
          console.log(`${data.senderId} is typing...`);
        } else {
          dispatch(toggleTypingStatus(false));
          console.log(`${data.senderId} stopped typing.`);
        }
      });
    }
  }, [socket, dispatch]);

  const send = () => {
    if (message.trim()) {
      const data = {
        senderId: user?.id!,
        receiverId: selectedUser?.id!,
        messageText: message,
      };

      sendMessage(data, dispatch);
      setMessage("");
      if (socket) {
        setTyping(false);
        const data = {
          senderId: user?.id!,
          receiverId: selectedUser.id,
          isTyping: false,
        };
        typingIndicator(data);
      }
    }
  };

  const handleSendMessage = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (
      (e as React.KeyboardEvent).key === "Enter" &&
      !(e as React.KeyboardEvent).shiftKey
    ) {
      e.preventDefault();
      send();
    } else if ((e as React.MouseEvent).type === "click") {
      send();
    }
  };

  const handleTyping = () => {
    if (!typing) {
      setTyping(true);
      const data = {
        senderId: user?.id!,
        receiverId: selectedUser.id,
        isTyping: true,
      };
      typingIndicator(data);
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      const data = {
        senderId: user?.id!,
        receiverId: selectedUser.id,
        isTyping: false,
      };
      typingIndicator(data);
    }, 2000); // 2 seconds
  };

  return (
    <div className="flex items-end gap-2">
      <Textarea
        placeholder="Type a message..."
        className="flex-1 min-h-[80px] max-h-[160px] resize-none rounded-2xl"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          handleSendMessage(e);
          handleTyping();
        }}
      />
      <Button
        size="icon"
        className="rounded-full"
        onClick={(e) => handleSendMessage(e)}
      >
        <SendIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
