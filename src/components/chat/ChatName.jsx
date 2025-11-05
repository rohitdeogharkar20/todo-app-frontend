import React from "react";

function ChatName(props) {
  const { roomName } = props;
  // console.log("ChatName")
  return (
    <>
      <div className="border-b border-red-700 p-3 font-semibold text-lg shadow-sm">
        {roomName}
      </div>
    </>
  );
}

export default ChatName;
