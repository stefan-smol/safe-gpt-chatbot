import React, { createContext, useContext, useEffect, useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import useUserIdentity from "@/hooks/useUserIdentity";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [handleNewWebSocketMessage, setHandleNewWebSocketMessage] = useState(
    () => () => {}
  );

  const { userId, conversationId } = useUserIdentity();
  const { openConnection, closeConnection, sendMessage, isConnected } =
    useWebSocket(
      `wss://27tirfnchl.execute-api.us-east-1.amazonaws.com/production/?conversationId=${conversationId}`,
      handleNewWebSocketMessage
    );

  useEffect(() => {
    openConnection();
    return () => {
      closeConnection();
      console.log("WebSocket context unmounted.");
    };
  }, [openConnection, closeConnection]);

  const setCallback = (callback) => {
    setHandleNewWebSocketMessage(() => callback);
  };

  return (
    <WebSocketContext.Provider
      value={{
        userId,
        conversationId,
        openConnection,
        closeConnection,
        sendMessage,
        isConnected,
        setCallback,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};
