import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  X,
  Search,
  EllipsisVertical,
  LogOut,
  UserRoundPen,
  CircleUserRound,
} from "lucide-react";
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
import { Skeleton } from "./ui/skeleton";
import { toggleChatSelection } from "@/features/user/userSlice";
import { setSelectedUser } from "@/features/chat/chatSlice";
import { SelectedUser } from "@/types/user";
import { getChats } from "@/features/chat/chatThunk";
import { userOnline } from "@/socketService";

type SidebarProps = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ setSidebarOpen }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { chats, loading } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);
  const { selectedUser } = useAppSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getUserChatHistory());
  }, []);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // handles chat selection
  const handleChatSelection = (chat: any) => {
    dispatch(toggleChatSelection(true));

    // find the selected user's id from the chat object
    const selectedUserId =
      user?.id === chat.sender_id ? chat.receiver_id : chat.sender_id;

    // user object for the selectedUser
    const selectedUser: SelectedUser = {
      id: selectedUserId,
      username: chat.username,
      profilePicture: chat.profile_picture,
    };

    // set the profile of the selected user
    dispatch(setSelectedUser(selectedUser));

    // get the user's online status
    userOnline({ senderId: user?.id!, receiverId: selectedUser.id });

    // get all the chats between the logged in user and selected user
    dispatch(getChats({ userId1: user?.id!, userId2: selectedUser.id }));
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.message_text.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="w-full">
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
                <UserRoundPen size={16} className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer flex items-center"
                onClick={() => dispatch(logoutUser())}
              >
                <LogOut size={16} className="mr-2" /> <span> Log Out</span>
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
        {loading
          ? [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex w-full p-3 items-center space-x-4"
              >
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
              </div>
            ))
          : filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 p-4 hover:bg-accent/20 hover:text-foreground cursor-pointer border-b w-full ${selectedUser?.id === chat.user_id ? "bg-accent/20 text-foreground" : ""}`}
                onClick={() => handleChatSelection(chat)}
              >
                <Avatar>
                  <AvatarImage
                    src={chat.profile_picture}
                    alt="profile_picture"
                  />
                  <AvatarFallback>
                    <CircleUserRound size={35} className="text-accent" />
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  <h3 className="font-medium text-foreground">
                    {chat.username}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {chat.message_text}
                  </p>
                </div>
              </div>
            ))}
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
