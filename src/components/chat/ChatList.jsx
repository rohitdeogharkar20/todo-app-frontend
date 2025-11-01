import axios from "axios";
import React, { useEffect, useState } from "react";

const { VITE_BACKEND_URL } = import.meta.env;

function ChatList(props) {
  const { setRoomName, socket, username, setShowMessage } = props;
  const [users, setUsers] = useState([]);

  const sendParticipants = (roomName) => {
    setRoomName(roomName);
    setShowMessage([]);
    socket.emit("previousMessages", { username, roomName, pagination: 0 });
  };

  useEffect(() => {
    socket.emit("previousChats", { username });

    socket.on("previousChats", (data) => {
      setUsers(data.result);
    });
  }, []);

  return (
    <>
      {users && users.length > 0
        ? users.map((item, i) => {
            return (
              <p
                key={i}
                onClick={() => {
                  sendParticipants(item.username);
                }}
              >
                {item.username}
              </p>
            );
          })
        : "No chats"}
    </>
  );
}

export default ChatList;
