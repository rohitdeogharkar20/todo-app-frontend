import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTodo from "./CreateTodo";
import Todofilter from "./TodoFilter";
import TodoBar from "./TodoBar";
import TodoDetails from "./TodoDetails";

const { VITE_BACKEND_URL } = import.meta.env;

function Mytodos() {
  const [todos, setTodos] = useState([]);
  const [showTodo, setShowTodo] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${VITE_BACKEND_URL}/todos/getTodoList`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(response.data.data);
    } catch (err) {
      console.log("to do list error", err);
    }
  };

  const clickTodo = (data, index) => {
    data.index = index;
    setShowTodo((prev) => {
      if (!prev.find((item) => item._id == data._id)) {
        return [data, ...prev];
      }
      return prev;
    });
  };

  const closeTodo = (value) => {
    setShowTodo((prev) => prev.filter((item) => item._id != value._id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div
        className={`flex
          justify-center
         items-center h-screen text-center mx-auto px-auto`}
      >
        <div
          className={`container flex-1 overflow-y-auto max-w-2xl bg-gray-50 rounded-lg py-8 shadow-lg font-poppins h-2/3`}
        >
          <div className="flex justify-center items-center">
            <CreateTodo className="fixed" renderList={fetchTodos} />
            <Todofilter />
          </div>
          {todos && todos.length > 0 ? (
            <div className="space-y-2">
              {todos.map((value, index) => {
                return (
                  <TodoBar
                    key={value._id}
                    value={value}
                    index={index}
                    fetchTodos={fetchTodos}
                    clickTodo={clickTodo}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No todos yet</p>
              <p className="text-sm mt-1">
                Create your first todo to get started!
              </p>
            </div>
          )}
        </div>

        {showTodo && showTodo.length > 0 && (
          <div className="flex flex-col overflow-y-auto ml-3 bg-gray-50 border border-gray-400 p-4 rounded-lg shadow-xl h-2/3 w-[450px] min-w-[450px] max-w-[450px]">
            <TodoDetails showTodo={showTodo} closeTodo={closeTodo} />
          </div>
        )}
      </div>
    </>
  );
}

export default Mytodos;
