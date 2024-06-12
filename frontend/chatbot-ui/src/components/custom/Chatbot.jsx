import React, { useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import userAvatar from "@/assets/user_profile_icon.png";
import assistantAvatar from "@/assets/bot_profile_icon.png";
import useUserIdentity from "@/hooks/useUserIdentity";
import useChat from "@/hooks/useChat";
import { useWebSocketContext } from "@/contexts/WebSocketContext";

function Chatbot({ closeChatbot }) {
  const {
    userId,
    conversationId,
    openConnection,
    sendMessage,
    closeConnection,
    isConnected,
    setCallback,
  } = useWebSocketContext();

  const { resetIdentity } = useUserIdentity();

  const {
    messages,
    input,
    handleInputChange,
    handleNewMessage,
    clearMessages,
    setInput,
  } = useChat();

  const handleNewWebSocketMessage = useCallback(
    (data) => {
      console.log("New WebSocket message received:", data);
      try {
        const messageData = JSON.parse(data);
        handleNewMessage(messageData);
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    },
    [handleNewMessage]
  );

  useEffect(() => {
    setCallback(handleNewWebSocketMessage);
  }, [handleNewWebSocketMessage, setCallback]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with input:", input);

    const newMessage = {
      action: "send",
      userId,
      conversationId,
      messageId: uuidv4(),
      type: "text",
      text: input.trim(),
      role: "user",
    };

    if (input.trim()) {
      console.log("Sending message:", newMessage);
      sendMessage(newMessage);
      handleNewMessage(newMessage);
      setInput("");
    }
  };

  const handleDisconnect = () => {
    console.log("Disconnect button clicked");
    closeConnection();
    clearMessages();
  };

  const handleResetIdentity = () => {
    console.log("Reset Identity button clicked");
    resetIdentity();
    handleDisconnect();
  };

  const refreshConversation = () => {
    console.log("Refresh Conversation button clicked");
    handleResetIdentity();
    clearMessages();
    openConnection();
  };

  return (
    <Card className="fixed bottom-8 right-4 w-[440px] z-50">
      <CardHeader className="flex justify-between items-center border-b-2 border-black">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="mr-2">
              <AvatarFallback>Bot</AvatarFallback>
              <AvatarImage src={assistantAvatar} />
            </Avatar>
            <div>
              <CardTitle>Sano</CardTitle>
              <CardDescription>Virtual Assistant</CardDescription>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={refreshConversation}
              aria-label="Refresh Conversation"
            >
              <i className="material-icons">refresh</i>
            </Button>
            <Button
              variant="ghost"
              onClick={closeChatbot}
              aria-label="Close Chatbot"
            >
              <i className="material-icons">close</i>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="flex flex-col h-[600px] w-full pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex w-full gap-3 text-slate-600 text-sm my-2"
            >
              <Avatar>
                <AvatarFallback>
                  {message.role === "user" ? "U" : "Bot"}
                </AvatarFallback>
                <AvatarImage
                  src={message.role === "user" ? userAvatar : assistantAvatar}
                />
              </Avatar>
              <p className="leading-relaxed">
                <span className="block font-bold text-slate-700">
                  {message.role === "user" ? "User" : "Bot"}
                </span>
                {message.text}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={!isConnected}
          />
          <Button type="submit" disabled={!isConnected}>
            Send
          </Button>
          <Button onClick={handleDisconnect} disabled={!isConnected}>
            Disconnect
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default Chatbot;
