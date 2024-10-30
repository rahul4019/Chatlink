import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Layout from "@/components/Layout";
import ChatSection from "@/components/ChatSection";
import NoChatSelected from "@/components/NoChatSelected";
export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <Layout>
      <div className="max-w-screen-2xl w-screen mx-auto overflow-hidden">
        <div className="flex h-screen bg-background">
          {/* Sidebar for larger screens */}
          {!isMobile && (
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-64 bg-card border-r border-border"
            >
              <Sidebar setSidebarOpen={setSidebarOpen} />
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
                <Sidebar setSidebarOpen={setSidebarOpen} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Chat Area */}
          {/* <ChatSection isMobile={isMobile} setSidebarOpen={setSidebarOpen} /> */}
          <NoChatSelected />
        </div>
      </div>
    </Layout>
  );
}
