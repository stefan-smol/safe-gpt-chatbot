import React, { useRef } from "react";

function WebsocketConnector({
  connectToWs,
  isConnected,
  onDisconnectClick,
}) {

  const wsUrlRef = useRef(null);

  const handleDisconnectClick = () => {
    if (wsUrlRef.current) {
      wsUrlRef.current.value = "";
    }
    onDisconnectClick();
  };

  return (
    <div className="center-content p-4">
      <form onSubmit={connectToWs} className="grid gap-2 w-full">
        <label className="text-2xl">Enter WebSocket URL</label>
        <input
          type="text"
          name="formWebsocketUrl"
          placeholder="WebSocket URL"
          ref={wsUrlRef}
          className="mb-2 input input-bordered w-full"
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={isConnected}
          type="submit"
        >
          Connect
        </button>
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={handleDisconnectClick}
          disabled={!isConnected}
        >
          Disconnect
        </button>
      </form>
    </div>
  );
}

export default WebsocketConnector;
