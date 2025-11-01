import React, { useState } from "react";

function MessageInput(props) {
  const { socket, setShowMessage, username, roomName } = props;

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    setShowMessage((prev) => [...prev, { username, message }]);
    socket.emit("sendMessage", { roomName, username, message: message.trim() });
    setMessage("");
  };

  return (  
    <>
      <input
        name="senderMessage"
        type="text"
        placeholder="Type Message Here...."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button disabled={message ? false : true} onClick={sendMessage}>
        Send
      </button>
    </>
  );
}

export default MessageInput;
