import React from "react";

function CurrentUserHeader({ conversationId, onResetIdentityClick }) {
  return (
    <div className="bg-slate-300 p-4 mb-6 grid grid-cols-2">
      <div>
        Current conversation ID: <b className="text-xl">{conversationId}</b>
      </div>
      <div className="justify-self-end">
        <button
          onClick={onResetIdentityClick}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset Identity
        </button>
      </div>
    </div>
  );
}

export default CurrentUserHeader;
