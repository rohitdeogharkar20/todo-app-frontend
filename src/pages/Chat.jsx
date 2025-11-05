import React, { useEffect, useState } from "react";
import { socket } from "../socket/Socket";
import Messages from "../components/chat/Messages";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import ChatDisplay from "../components/chat/ChatDisplay";

function Chat() {
  const { username } = useContext(ThemeContext);
  // console.log("Chat");
  const [messageInput, setMessageInput] = useState(false); // to show input box when the socket is connected

  useEffect(() => {
    // try {
      if (!socket.connected && username) {
        socket.connect();

        socket.emit("joinRoom", username);

        socket.on("joinRoom", (data) => {
          setMessageInput(true);
        });
      }

    return () => {
      socket.off("joinRoom");
      socket.connected && socket.disconnect();
    };
  }, [username]);

  return (
    <>{
      messageInput && <ChatDisplay username={username} socket={socket} />}</>
  );
}

export default Chat;
