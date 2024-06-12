import React from "react";
import ChatbotWrapper from "@/components/custom/ChatbotWrapper";
import { WebSocketProvider } from "@/contexts/WebSocketContext";

function App() {
  return (
    <WebSocketProvider>
      <ChatbotWrapper />
    </WebSocketProvider>
  );
}

export default App;
