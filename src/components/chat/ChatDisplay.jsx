import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import ChatName from "./ChatName";

function ChatDisplay(props) {
  const { socket, username } = props;
  // console.log("ChatDisplay");
  const [showMessage, setShowMessage] = useState([]); // shared for listing the messages
  const [roomName, setRoomName] = useState(""); // shared for roomName

  return (
    <>
      <div className="flex font-poppins mx-auto w-3/4 max-w-6xl h-[80vh] bg-white rounded-2xl shadow-xl overflow-hidden">
        <ChatList
          socket={socket}
          username={username}
          setRoomName={setRoomName}
          roomName={roomName}
          setShowMessage={setShowMessage}
        />

        <div className="flex flex-1 flex-col">
          {roomName ? (
            <>
              <ChatName roomName={roomName} />

              <div className="flex-1 overflow-y-auto bg-gray-50">
                <Messages
                  socket={socket}
                  username={username}
                  roomName={roomName}
                  showMessage={showMessage}
                  setShowMessage={setShowMessage}
                />
              </div>

              <div className="border-t bg-white">
                <MessageInput
                  socket={socket}
                  username={username}
                  roomName={roomName}
                  setShowMessage={setShowMessage}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center bg-gray-50 text-gray-400 text-lg">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatDisplay;
