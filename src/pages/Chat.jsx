import React, { useEffect, useState } from "react";
import { socket } from "../socket/Socket";
import Messages from "../components/chat/Messages";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import ChatDisplay from "../components/chat/ChatDisplay";

function Chat() {
  const { username } = useContext(ThemeContext);

  const [messageInput, setMessageInput] = useState(false); // to show input box when the socket is connected

  useEffect(() => {
    if (!socket.connected && username) {
      socket.connect();

      socket.emit("joinRoom", username);

      socket.on("joinRoom", (data) => {
        setMessageInput(true);
      });
    }

    return () => {
      socket.off("user-left");
      socket.connected && socket.disconnect();
    };
  }, [username]);

  return (
    <>
      {messageInput && (
        <div className="container">
          <ChatDisplay username={username} socket={socket} />
        </div>
      )}
    </>
  );
}

export default Chat;
