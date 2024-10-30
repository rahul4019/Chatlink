import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Search, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { CommandDialogCompnent } from "./CommandDialog";
import { getUserChatHistory } from "@/features/user/userThunk";

type SidebarProps = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ setSidebarOpen }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { chats, loading, error } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserChatHistory());
  }, []);

  // const [chats] = useState([
  //   { id: 1, name: "John Doe", lastMessage: "See you tomorrow!" },
  //   { id: 2, name: "Jane Smith", lastMessage: "Thanks for your help." },
  //   { id: 3, name: "Bob Johnson", lastMessage: "How's the project going?" },
  //   { id: 4, name: "Alice Brown", lastMessage: "Let's schedule a meeting." },
  //   { id: 5, name: "Charlie Davis", lastMessage: "I've sent the files." },
  //   { id: 6, name: "Eva Wilson", lastMessage: "Can you review this?" },
  //   {
  //     id: 7,
  //     name: "Frank Miller",
  //     lastMessage: "Great job on the presentation!",
  //   },
  //   {
  //     id: 8,
  //     name: "Grace Lee",
  //     lastMessage: "Don't forget about the deadline.",
  //   },
  //   { id: 9, name: "Henry Taylor", lastMessage: "I'll get back to you soon." },
  //   { id: 10, name: "Ivy Clark", lastMessage: "Let's catch up sometime." },
  //   { id: 11, name: "John Doe", lastMessage: "See you tomorrow!" },
  //   { id: 12, name: "Jane Smith", lastMessage: "Thanks for your help." },
  //   { id: 13, name: "Bob Johnson", lastMessage: "How's the project going?" },
  //   { id: 14, name: "Alice Brown", lastMessage: "Let's schedule a meeting." },
  //   { id: 15, name: "Charlie Davis", lastMessage: "I've sent the files." },
  // ]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const filteredChats = chats.filter(
    (chat) =>
      chat.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.message_text.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-semibold">Chats</h1>
        <div className="flex gap-2">
          <CommandDialogCompnent />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => dispatch(logoutUser())}
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-128px)]">
        {filteredChats.map((chat) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: chat.id * 0.1 }}
            className="flex items-center gap-3 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            <Avatar>
              <AvatarImage src={chat.profile_picture} alt="profile_picture" />
              <AvatarFallback>
                {chat.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{chat.username}</h3>
              <p className="text-sm text-muted-foreground">
                {chat.message_text}
              </p>
            </div>
          </motion.div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
