import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Chatbot from "./Chatbot";

import { useWebSocketContext } from "@/contexts/WebSocketContext";

function FloatingActionButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { openConnection, isConnected } = useWebSocketContext();

  const openChatbot = () => {
    if (!isConnected) {
      console.log("Opening connection!");
      openConnection();
    }
    setIsChatOpen(true);
  };

  const closeChatbot = () => {
    setIsChatOpen(false);
    console.log("Chatbot closed.");
  };

  return (
    <div>
      {!isChatOpen && (
        <Button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg text-2xl flex items-center justify-center w-20 h-20"
          aria-label="Toggle Chatbot"
          onClick={openChatbot}
        >
          ?
        </Button>
      )}
      {isChatOpen && <Chatbot closeChatbot={closeChatbot} />}
    </div>
  );
}

export default FloatingActionButton;
