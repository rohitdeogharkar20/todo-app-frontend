import React, { useEffect, useState } from "react";
import ActionButtons from "./ActionButtons";
import DateOperations from "../dates/DateOperations";

function TodoBar(props) {
  const { value, index, fetchTodos, clickTodo, filter } = props;

  return (
    <>
      <div
        key={value._id}
        className="grid grid-cols-3 gap-4 border w-4/5 border-gray-400 rounded-lg p-3 mx-auto shadow-sm hover:shadow-md transition-shadow bg-white font-poppins"
      >
        <span
          className="flex items-center gap-2 text-gray-800"
          onClick={() => clickTodo(value, index)}
        >
          <span className="text-gray-500 font-medium">{index + 1}.</span>
          <span
            className={`${
              value.completeStatus === 1 ? "line-through text-gray-400" : ""
            }`}
          >
            {value.title && value.title.length < 12
              ? value.title
              : `${value.title.substring(0, 12)}...`}
          </span>
        </span>

        <DateOperations value={value} />
        <ActionButtons value={value} filter={filter} fetchTodos={fetchTodos} />
      </div>
    </>
  );
}

export default TodoBar;
