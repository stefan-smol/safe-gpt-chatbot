import { useState, useCallback } from "react";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleNewMessage = useCallback((messageData) => {
    console.log(
      "useChat - handleNewMessage called with message data:",
      messageData
    );
    const newMessage = {
      text: messageData.text,
      role: messageData.role || "assistant",
    };
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      console.log("useChat - updated messages:", updatedMessages);
      return updatedMessages;
    });
  }, []);

  const handleInputChange = (event) => {
    console.log(
      "useChat - handleInputChange called with value:",
      event.target.value
    );
    setInput(event.target.value);
  };

  const clearMessages = () => {
    console.log("useChat - clearMessages called");
    setMessages([]);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleNewMessage,
    clearMessages,
    setInput,
  };
};

export default useChat;
