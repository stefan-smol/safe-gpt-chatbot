import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CurrentUserHeader from "./components/CurrentUserHeader";
import ChatDisplay from "./components/ChatDisplay";
import WebsocketConnector from "./components/WebsocketConnector";

function App() {
    const [ws, setWs] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const connectToWs = (event) => {
        event.preventDefault();
        const wsUrl = event.target.elements.formWebsocketUrl.value;
        if (wsUrl) {
            const wsFullUrl = `${wsUrl}?conversationId=${conversationId}`;
            const newWebsocket = new WebSocket(wsFullUrl);

            setWs(newWebsocket);
            newWebsocket.onerror = () => {
                console.log("Error occurred in WebSocket connection. Terminating...");
                setIsConnected(false);
            };

            newWebsocket.onopen = () => {
                console.log("WebSocket connection opened");
                setIsConnected(true);
            };

            newWebsocket.onmessage = (event) => {
                console.log("Message received:", event.data);
                try {
                    const messageData = JSON.parse(event.data);
                    
                    const newMessage = {
                        text: messageData.message 
                    };
                    
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                } catch (error) {
                    console.error("Error parsing message data:", error);
                }
            };
            

            newWebsocket.onclose = () => {
                console.log("WebSocket connection closed");
                setIsConnected(false);
            };
        }
    };

    useEffect(() => {
        const storedConversationId = sessionStorage.getItem("conversationId");
        if (!storedConversationId) {
            const randomId = uuidv4();
            sessionStorage.setItem("conversationId", randomId);
            setConversationId(randomId);
        } else {
            setConversationId(storedConversationId);
        }
    }, []);

    const sendMessage = (message) => {
        const newMessage = {
            action: 'send',
            userId: conversationId,
            messageId: uuidv4(),
            conversationId,
            type: "text",
            text: message
        };
        
        if (ws && isConnected) {
            ws.send(JSON.stringify(newMessage));
            setMessages(prevMessages => [...prevMessages, newMessage]); // Optimistic update
        }
    };

    const onDisconnectClick = () => {
        if (ws) {
            ws.close();
        }
    };

    const onClearClick = () => {
        setMessages([]);
    };

    const onResetIdentityClick = () => {
        const randomId = uuidv4();
        sessionStorage.setItem("conversationId", randomId);
        setConversationId(randomId);
        onDisconnectClick();
        onClearClick();
    };

    return (
        <main className="">
            <div>
                <CurrentUserHeader
                    conversationId={conversationId}
                    onResetIdentityClick={onResetIdentityClick}
                />
            </div>
            <div className="grid grid-rows-3 grid-flow-col gap-2 place-content-center">
                <div>
                    <WebsocketConnector
                        isConnected={isConnected}
                        connectToWs={connectToWs}
                        onDisconnectClick={onDisconnectClick}
                        sendMessage={sendMessage}
                    />
                </div>
                <div>
                    <ChatDisplay
                        messages={messages}
                        onClearClick={onClearClick}
                        sendMessage={sendMessage}
                    />
                </div>
            </div>
        </main>
    );
}

export default App;
