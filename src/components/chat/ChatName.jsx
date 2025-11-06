import { format, fromUnixTime, set } from "date-fns";
import React, { useEffect, useState } from "react";

function ChatName(props) {
  const { roomName, socket } = props;

  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    socket.on("userStatus", (result) => {
      setUserStatus(result);
    });
  }, []);
  console.log("ChatName");
  return (
    <>
      <div className="border-b border-red-700 p-3 font-semibold text-lg shadow-sm">
        {roomName}
        <p className="text-xs text-gray-500">
          {userStatus &&
            (userStatus == 1
              ? "online"
              : userStatus == 404
              ? ""
              : ` last seen on ${format(
                  new Date(userStatus),
                  "dd/MM/yyyy hh:mm a"
                )}`)}
        </p>
      </div>
    </>
  );
}

export default ChatName;
