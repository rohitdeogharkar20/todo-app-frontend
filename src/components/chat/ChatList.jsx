import React, { useEffect, useRef, useState } from "react";

function ChatList(props) {
  const { setRoomName, socket, username, setShowMessage, roomName } = props;
  const [users, setUsers] = useState([]);
  // console.log("ChatList");

  const sendParticipants = (name, e) => {
    if (roomName != name) {
      setRoomName(name);
      setShowMessage([]);
      socket.emit("previousMessages", {
        username,
        roomName: name,
        pagination: 0,
      });

      socket.emit("userStatus", { username, roomName: name });
    }
  };

  useEffect(() => {
    socket.emit("previousChats", { username });

    socket.on("previousChats", (data) => {
      setUsers(data.result);
    });

    return () => {
      socket.off("previousChats");
    };
  }, []);

  return (
    <>
      <div className="border-r border-red-800 p-3 min-w-60 max-w-60 h-full bg-white overflow-y-auto">
        {users && users.length > 0 ? (
          users.map((item, i) => (
            <p
              key={i}
              onClick={(e) => sendParticipants(item.username, e)}
              className={`p-2 rounded-lg cursor-pointer ${
                roomName == item.username && "bg-blue-300"
              } hover:bg-blue-100 transition-colors`}
            >
              {item.username}
            </p>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No chats</p>
        )}
      </div>
    </>
  );
}

export default ChatList;
