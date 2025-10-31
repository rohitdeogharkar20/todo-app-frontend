import React from "react";
import { format } from "date-fns";
import { useRef } from "react";

function Messages(props) {
  const { messages, handleScroll, username } = props;
  let messageRef = useRef(0);
  // console.log(messageRef.current.scrollTop);

  if (messageRef.current.scrollTop > 0) {

    console.log(messageRef.current.scrollHeight)
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }
  return (
    <>
      {/* <div className="container overflow-y-auto h-3/4 border border-red-700"> */}
      <div
        onScroll={handleScroll}
        ref={messageRef}
        className="container flex flex-col justify-between overflow-y-auto h-40 border border-red-700 w-1/2"
      >
        {messages &&
          messages.length > 0 &&
          messages.map((item, i) => {
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
            //         messages[messages.length - i].username == username
            //           ? "text-right"
            //           : ""
            //       } p-1/2 m-1`}
            //       key={i}
            //     >
            //       {messages[messages.length - i].message}
            //     </p>
            //   );
            // }
          })}
      </div>
    </>
  );
}

export default Messages;
