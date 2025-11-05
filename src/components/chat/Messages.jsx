import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRef } from "react";

function Messages(props) {
  const { showMessage, roomName, socket, username, setShowMessage } = props;
  // console.log("Messages");
  const [pagination, setPagination] = useState(0);
  let messageRef = useRef(0);
  let compRef = useRef(true);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop <= 0) {
      setPagination((prev) => prev + 20);
    }
  };

  useEffect(() => {
    if (compRef.current) {
      compRef.current = false;
      return;
    }

    if (roomName) {
      // console.log("useEffect");
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
        setShowMessage((prev) => [...prev, ...messageArray]);
      }
    });

    // if (messageRef.current) {
    //   messageRef.current.scrollTop = messageRef.current.scrollHeight;
    // }
    // const messageContainer = document.getElementById("messageContainer")
    // console.log(messageContainer)
    // if(messageContainer){
    //   messageContainer.scrollTop = messageContainer.scrollHeight
    // }
  }, []);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [showMessage]);

  // console.log(showMessage.length);

  return (
    <>
      <div
        onScroll={handleScroll}
        ref={messageRef}
        id="messageContainer"
        className="flex flex-col overflow-y-auto border border-red-700 p-3 space-y-1 h-full"
      >
        {showMessage && showMessage.length > 0 ? (
          showMessage.map((item, i) => {
            // console.log(i);
            // console.log(item.message);
            // <p
            //   key={i}
            //   className={`${
            //     item.username === username
            //       ? "text-right bg-blue-100 self-end"
            //       : "text-left bg-gray-100 self-start"
            //   } px-3 py-1 rounded-lg max-w-[70%]`}
            // >
            //   {item.message}
            //   <span className="ml-3 text-xs text-gray-500">
            //     {format(item.insertedAt, "hh:mm a")}
            //   </span>
            // </p>

            if (i > 0) {
              // console.log(
              //   `${showMessage.length} | ${i} | ${showMessage.length - i} |${
              //     showMessage[showMessage.length - i].message
              //   }`
              // );
              return (
                <p
                  key={i}
                  className={`${
                    showMessage[showMessage.length - i].username === username
                      ? "text-right bg-blue-100 self-end"
                      : "text-left bg-gray-100 self-start"
                  } px-3 py-1 rounded-lg max-w-[70%]`}
                >
                  {showMessage[showMessage.length - i].message}
                  <span className="ml-3 text-xs text-gray-500">
                    {format(
                      showMessage[showMessage.length - i].insertedAt,
                      "hh:mm a"
                    )}
                  </span>
                </p>
              );
            }
            // else {
            //   console.log(
            //     `${showMessage.length} | ${i} | ${showMessage[0].message}`
            //   );
            //   return (
            //     <p
            //       key={i}
            //       className={`${
            //         showMessage[0].username === username
            //           ? "text-right bg-blue-100 self-end"
            //           : "text-left bg-gray-100 self-start"
            //       } px-3 py-1 rounded-lg max-w-[70%]`}
            //     >
            //       {showMessage[0].message}
            //       <span className="ml-3 text-xs text-gray-500">
            //         {format(showMessage[0].insertedAt, "hh:mm a")}
            //       </span>
            //     </p>
            //   );
            // }
          })
        ) : (
          <p className="text-gray-400 text-center mt-auto">No messages yet</p>
        )}
      </div>
    </>
  );
}

export default Messages;
