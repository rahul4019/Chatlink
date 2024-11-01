import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useAppSelector } from "@/app/hooks";

const MessageSection = () => {
  // const [loading, setloading] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sent: false },
    { id: 2, text: "Hi! How are you?", sent: true },
    { id: 3, text: "I'm doing great, thanks for asking!", sent: false },
    { id: 4, text: "That's wonderful to hear!", sent: true },
    { id: 5, text: "Do you have any plans for the weekend?", sent: false },
    { id: 6, text: "Hey there!", sent: false },
    { id: 7, text: "Hi! How are you?", sent: true },
    { id: 8, text: "I'm doing great, thanks for asking!", sent: false },
    { id: 9, text: "That's wonderful to hear!", sent: true },
    { id: 10, text: "Do you have any plans for the weekend?", sent: false },
    { id: 11, text: "Hey there!", sent: false },
    { id: 12, text: "Hi! How are you?", sent: true },
    { id: 13, text: "I'm doing great, thanks for asking!", sent: false },
    { id: 14, text: "That's wonderful to hear!", sent: true },
    { id: 15, text: "Do you have any plans for the weekend?", sent: false },
  ]);

  const { chats, loading } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.auth);
  // const sendMessage = (text: string) => {
  //   const newMessage = { id: messages.length + 1, text, sent: true };
  //   setMessages([...messages, newMessage]);
  // };

  return (
    <ScrollArea className="flex-1 p-4">
      {loading
        ? [...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`${index % 2 === 0 ? "rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-secondary" : "rounded-tl-2xl rounded-bl-2xl rounded-br-2xl bg-accent/50"} p-4 `}
              >
                <Skeleton
                  className={`h-6 ${index % 2 === 0 ? "w-[300px]" : "w-[250px]"}`}
                />
                <Skeleton className="h-3 w-[100px] mt-2" />
              </div>
            </div>
          ))
        : chats.map(
            (
              message: {
                id: number;
                message_text: string;
                sent: boolean | null;
              },
              i: number,
            ) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"} mb-4`}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`max-w-[70%] px-3 pt-2 pb-1 ${
                    message.sender_id === user?.id
                      ? "bg-primary text-primary-foreground rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                      : "bg-secondary text-secondary-foreground rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                  }`}
                >
                  <p>{message.message_text}</p>
                  <p className="text-xs text-end mt-2 opacity-70">
                    {new Date(message.sent_at).toLocaleString("en-us", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </motion.div>
              </motion.div>
            ),
          )}
    </ScrollArea>
  );
};

export default MessageSection;
