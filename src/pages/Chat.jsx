import React, { useEffect, useState } from "react";
import { socket } from "../socket/Socket";
import Messages from "../components/chat/Messages";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function Chat() {
  const { username } = useContext(ThemeContext);
  const [messageInput, setMessageInput] = useState(false); // to show input box when the socket is connected
  const [message, setMessage] = useState(""); // to get the changes of message input box
  const [showMessage, setShowMessage] = useState([]); // to show the message on display after submit and when the message is listened
  const [roomName, setRoomName] = useState("");
  const [pagination, setPagination] = useState(0);

  const sendMessage = () => {
    setShowMessage((prev) => [...prev, { username, message }]);
    socket.emit("sendMessage", { roomName, username, message });
    setMessage("");
  };

  const sendParticipants = () => {
    setShowMessage([]);
    socket.emit("previousMessages", { username, roomName, pagination });
  };

  const handleScroll = (e) => {
    let { scrollTop } = e.target;
    if (scrollTop % 80 === 0) {
      setPagination(pagination + 10);
    }
  };

  useEffect(() => {
    socket.emit("previousMessages", { username, roomName, pagination });
  }, [pagination]);

  useEffect(() => {
    if (!socket.connected && username) {
      console.log(username);
      socket.connect();

      socket.emit("joinRoom", username);

      socket.on("joinRoom", (data) => {
        setMessageInput(true);
      });

      socket.on("receiveMessage", (data) => {
        setShowMessage((prev) => [...prev, data]);
      });

      socket.on("previousMessages", (data) => {
        let messageArray = data.data;
        if (messageArray.length > 0) {
          setShowMessage((prev) => [...prev, ...data.data]);
        }
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
          <input
            className="my-4"
            type="text"
            name="roomName"
            placeholder="room name here"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <button onClick={sendParticipants}>Send Participants</button>

          <Messages
            username={username}
            handleScroll={handleScroll}
            messages={showMessage}
          />

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
        </div>
      )}
    </>
  );
}

export default Chat;
