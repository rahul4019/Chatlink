import { ModeToggle } from "@/components/mode-toggle";
import MessageSection from "@/components/MessageSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound, MenuIcon, SendIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/app/hooks";

type ChatSectionprops = {
  isMobile: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
};

const ChatSection = ({ isMobile, setSidebarOpen }: ChatSectionprops) => {
  const { user } = useAppSelector((state) => state.auth);
  const { selectedUser } = useAppSelector((state) => state.chat);
  const { socket } = useAppSelector((state) => state.socket);
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          )}
          <Avatar>
            <AvatarImage src={selectedUser?.profilePicture} alt="avatar" />
            <AvatarFallback>
              <CircleUserRound size={35} className="text-accent" />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{selectedUser?.username}</h2>
        </div>

        <div className="flex gap-2">
          <ModeToggle />
        </div>
      </div>

      {/* Messages */}

      <MessageSection />
      {/* Compose Message */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="p-4 border-t border-border bg-card"
      >
        <div className="flex items-end gap-2">
          <Textarea
            placeholder="Type a message..."
            className="flex-1 min-h-[80px] max-h-[160px] resize-none rounded-2xl"
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                console.log("msg: ", target.value);
                // sendMessage(target.value);
                // target.value = "";
                const data = {
                  senderId: user?.id,
                  receiverId: selectedUser?.id,
                  messageText: target.value,
                };

                socket?.emit("chat:sendMessage", data);
              }
            }}
          />
          <Button size="icon" className="rounded-full">
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatSection;
