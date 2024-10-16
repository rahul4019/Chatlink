import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MenuIcon, SendIcon, X, Search } from "lucide-react";

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sent: false },
    { id: 2, text: "Hi! How are you?", sent: true },
    { id: 3, text: "I'm doing great, thanks for asking!", sent: false },
    { id: 4, text: "That's wonderful to hear!", sent: true },
    { id: 5, text: "Do you have any plans for the weekend?", sent: false },
  ]);

  const [chats] = useState([
    { id: 1, name: "John Doe", lastMessage: "See you tomorrow!" },
    { id: 2, name: "Jane Smith", lastMessage: "Thanks for your help." },
    { id: 3, name: "Bob Johnson", lastMessage: "How's the project going?" },
    { id: 4, name: "Alice Brown", lastMessage: "Let's schedule a meeting." },
    { id: 5, name: "Charlie Davis", lastMessage: "I've sent the files." },
    { id: 6, name: "Eva Wilson", lastMessage: "Can you review this?" },
    {
      id: 7,
      name: "Frank Miller",
      lastMessage: "Great job on the presentation!",
    },
    {
      id: 8,
      name: "Grace Lee",
      lastMessage: "Don't forget about the deadline.",
    },
    { id: 9, name: "Henry Taylor", lastMessage: "I'll get back to you soon." },
    { id: 10, name: "Ivy Clark", lastMessage: "Let's catch up sometime." },
    { id: 11, name: "John Doe", lastMessage: "See you tomorrow!" },
    { id: 12, name: "Jane Smith", lastMessage: "Thanks for your help." },
    { id: 13, name: "Bob Johnson", lastMessage: "How's the project going?" },
    { id: 14, name: "Alice Brown", lastMessage: "Let's schedule a meeting." },
    { id: 15, name: "Charlie Davis", lastMessage: "I've sent the files." },
  ]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const sendMessage = (text: string) => {
    const newMessage = { id: messages.length + 1, text, sent: true };
    setMessages([...messages, newMessage]);
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-semibold">Chats</h1>
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
            placeholder="Search chats..."
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
              <AvatarFallback>
                {chat.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{chat.name}</h3>
              <p className="text-sm text-muted-foreground">
                {chat.lastMessage}
              </p>
            </div>
          </motion.div>
        ))}
      </ScrollArea>
    </>
  );

  return (
    <div className="max-w-screen-2xl w-screen mx-auto">
      <div className="flex h-screen bg-background">
        {/* Sidebar for larger screens */}
        {!isMobile && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-64 bg-card border-r border-border"
          >
            <SidebarContent />
          </motion.div>
        )}

        {/* Sidebar for mobile screens */}
        <AnimatePresence>
          {isMobile && sidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border"
            >
              <SidebarContent />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
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
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="John Doe"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">John Doe</h2>
            </div>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {messages.map((message, i) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex ${message.sent ? "justify-end" : "justify-start"} mb-4`}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`max-w-[70%] p-3 rounded-3xl ${
                    message.sent
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date().toLocaleTimeString()}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </ScrollArea>

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
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    const target = e.target as HTMLTextAreaElement;
                    sendMessage(target.value);
                    target.value = "";
                  }
                }}
              />
              <Button size="icon" className="rounded-full">
                <SendIcon className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
