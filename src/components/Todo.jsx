import React from "react";
import ActionButtons from "./ActionButtons";
import DateOperations from "./DateOperations";

function Todo(props) {
  const { value, index, fetchTodos } = props;

  return (
    <>
      <div
        key={value._id}
        className="flex border w-4/5 items-center justify-between border-gray-400 rounded-lg p-3 mx-auto shadow-sm hover:shadow-md transition-shadow bg-white font-poppins"
      >
        <span className="flex items-center gap-2 text-gray-800">
          <span className="text-gray-500 font-medium">{index + 1}.</span>
          <span
            className={`${
              value.completeStatus === 1 ? "line-through text-gray-400" : ""
            }`}
          >
            {value.title}
          </span>
        </span>

        <DateOperations value={value} />

        <ActionButtons value={value} fetchTodos={fetchTodos} />
      </div>
    </>
  );
}

export default Todo;
