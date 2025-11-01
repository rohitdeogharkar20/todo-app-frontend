import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

function ChatDisplay(props) {
  const { socket, username } = props;

  const [showMessage, setShowMessage] = useState([]); // shared for listing the messages
  const [roomName, setRoomName] = useState(""); // shared for roomName

  return (
    <>
      <ChatList
        socket={socket}
        username={username}
        setRoomName={setRoomName}
        setShowMessage={setShowMessage}
      />

      <Messages
        socket={socket}
        username={username}
        roomName={roomName}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />

      {roomName && (
        <MessageInput
          socket={socket}
          username={username}
          roomName={roomName}
          setShowMessage={setShowMessage}
        />
      )}
    </>
  );
}

export default ChatDisplay;
