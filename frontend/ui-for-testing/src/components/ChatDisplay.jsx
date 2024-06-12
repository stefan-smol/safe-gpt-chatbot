import React, { useState } from "react";

function ChatDisplay({ messages, onClearClick, sendMessage }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="p-4 overflow-auto h-96 max-h-96 border-2 border-black">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here"
        className="mb-2 border-solid border-2 border-black w-full"
      />
      <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleSend}>
        Send Message
      </button>
      <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mb-4" onClick={onClearClick}>
        Clear Messages
      </button>
      {console.log(messages)}
      {messages.map((msg, index) => (
        <div key={index} className="bg-gray-100 p-2 rounded shadow my-2">
          {msg.text} 
        </div>
      ))}
    </div>
  );
}

export default ChatDisplay;
