import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRef } from "react";

function Messages(props) {
  const { showMessage, roomName, socket, username, setShowMessage } = props;

  const [pagination, setPagination] = useState(0);
  let messageRef = useRef(0);

  // if (messageRef.current.scrollTop > 0) {
  //   messageRef.current.scrollTop = messageRef.current.scrollHeight;
  // }

  const handleScroll = (e) => {
    let { scrollTop } = e.target;
    if (scrollTop % 80 === 0) {
      setPagination(pagination + 10);
    }
  };

  useEffect(() => {
    if (roomName) {
      socket.emit("previousMessages", { username, roomName, pagination });
    }
  }, [pagination]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setShowMessage((prev) => [...prev, data]);
    });

    socket.on("previousMessages", (data) => {
      let messageArray = data.data;
      if (messageArray.length > 0) {
        setShowMessage((prev) => [...prev, ...data.data]);
      }
    });
  }, []);

  return (
    <>
      <div
        onScroll={handleScroll}
        ref={messageRef}
        className="container flex flex-col justify-between overflow-y-auto h-40 border border-red-700 w-1/2"
      >
        {showMessage &&
          showMessage.length > 0 &&
          showMessage.map((item, i) => {
            return (
              <p
                className={`${
                  item.username == username ? "text-right" : ""
                } p-1/2 m-1`}
                key={i}
              >{`${item.message}`}</p>
            );

            // if (i > 0) {

            //   return (
            //     <p
            //       className={`${
            //         showMessage[showMessage.length - i].username == username
            //           ? "text-right"
            //           : ""
            //       } p-1/2 m-1`}
            //       key={i}
            //     >
            //       {showMessage[showMessage.length - i].message}
            //     </p>
            //   );
            // }
          })}
      </div>
    </>
  );
}

export default Messages;
