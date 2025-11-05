import { format } from "date-fns";
import React, { useState } from "react";

function MessageInput(props) {
  const { socket, setShowMessage, username, roomName } = props;

  const [message, setMessage] = useState("");
  // console.log("MessageInput");
  const sendMessage = () => {
    setShowMessage((prev) => [
      ...prev,
      { username, message, insertedAt: format(new Date(), "yyyy-MM-dd HH:mm") },
    ]);
    socket.emit("sendMessage", { roomName, username, message: message.trim() });
    setMessage("");
  };

  return (
    <>
      <div className="border-t border-red-800 p-3 bg-white flex items-end gap-2">
        <textarea
          name="senderMessage"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1}
          className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-32"
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />

        <button
          disabled={!message.trim()}
          onClick={sendMessage}
          className={`px-4 py-2 rounded-lg text-white font-medium transition ${
            message.trim()
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </>
  );
}

export default MessageInput;
