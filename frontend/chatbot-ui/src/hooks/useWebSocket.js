import { useRef, useState, useCallback } from "react";

const useWebSocket = (url, onMessageReceived = () => {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  const openConnection = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log("Opening WebSocket connection to URL:", url);
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log("WebSocket connection opened");
        setIsConnected(true);
      };

      wsRef.current.onmessage = (event) => {
        console.log("Message received:", event.data);
        onMessageReceived(event.data);
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed");
        setIsConnected(false);
      };

      wsRef.current.onerror = (error) => {
        console.log("Error in WebSocket connection:", error);
        setIsConnected(false);
      };
    }
  }, [url, onMessageReceived]);

  const sendMessage = useCallback(
    (message) => {
      if (wsRef.current && isConnected) {
        console.log("Sending message:", message);
        wsRef.current.send(JSON.stringify(message));
      } else {
        console.log("Cannot send message, WebSocket is not connected");
      }
    },
    [isConnected]
  );

  const closeConnection = useCallback(() => {
    if (wsRef.current) {
      console.log("Closing WebSocket connection");
      wsRef.current.close();
    }
  }, []);

  return {
    openConnection,
    sendMessage,
    isConnected,
    closeConnection,
  };
};

export default useWebSocket;
