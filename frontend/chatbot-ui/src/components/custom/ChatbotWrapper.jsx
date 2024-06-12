import React, { useEffect } from "react";
import FloatingActionButton from "./FloatingActionButton";

import { useWebSocketContext } from "@/contexts/WebSocketContext";

function ChatbotWrapper() {
  const { userId, conversationId, isConnected } = useWebSocketContext();

  useEffect(() => {
    console.log("ChatbotWrapper mounted.");
    console.log("conversationId:", conversationId);
    console.log("userId:", userId);
    console.log("Is websocket connected?", isConnected);
    return () => {
      console.log("ChatbotWrapper unmounted.");
    };
  }, [conversationId, userId, isConnected]);

  return (
    <>
      <div>
        <p>conversationId: {conversationId}</p>
        <p>userId: {userId}</p>
        <p>Is websocket connected? {isConnected.toString()}</p>
      </div>

      <div className="fixed bottom-8 right-8">
        <FloatingActionButton />
      </div>
    </>
  );
}

export default ChatbotWrapper;
