import { Zap, MessageCircle } from "lucide-react";

export default function NoChatSelected() {
  return (
    <div className="flex flex-col  items-center justify-center h-full bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-foreground p-8">
      <div className="relative mb-8">
        <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full animate-pulse"></div>
        <MessageCircle className="w-24 h-24 text-primary relative z-10" />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Welcome to Chat-Link
      </h1>
      <p className="text-center text-muted-foreground mb-8 max-w-md text-lg">
        Connect, collaborate, and chat in style. Your conversations, reimagined.
      </p>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-md"></div>
        <div className="relative bg-card rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-primary">
            Get Started
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              Select a chat from the sidebar to begin messaging
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              Use the search bar to find a chat
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              Click the "+" icon to start a new chat or create a group
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 flex items-center justify-center bg-muted/50 rounded-full px-6 py-3 text-muted-foreground">
        <Zap className="w-5 h-5 mr-2 text-yellow-500" />
        <span>
          {/* Quick Tip: Use @mentions to quickly find and add contacts to your */}
          {/* chats! */}
          Built by{" "}
          <a
            className="underline hover:text-primary"
            href="https://github.com/rahul4019"
            target="_blank"
            rel="noopener nereferrer"
          >
            rahul4019
          </a>
        </span>
      </div>
    </div>
  );
}
