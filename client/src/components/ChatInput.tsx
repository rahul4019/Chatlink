import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { sendMessage } from "@/socketService";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";

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

  const send = () => {
    // remove trailing spaces
    if (message.trim()) {
      const data = {
        senderId: user?.id!,
        receiverId: selectedUser?.id!,
        messageText: message,
      };

      sendMessage(data, dispatch);
      setMessage(""); // Clear the message after sending
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
    setTyping(true);
    // Placeholder for typing indicator logic
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
