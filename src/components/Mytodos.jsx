import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTodo from "./CreateTodo";
import Todofilter from "./TodoFilter";
import Todo from "./Todo";

const { VITE_BACKEND_URL } = import.meta.env;

function Mytodos() {
  const [todos, setTodos] = useState([]);

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

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="container mx-auto w-full max-w-2xl bg-gray-50 rounded-lg py-8 shadow-lg font-poppins">
          <div className="flex justify-center items-center">
            <CreateTodo renderList={fetchTodos} />
            <Todofilter />
          </div>
          {todos && todos.length > 0 ? (
            <div className="space-y-2">
              {todos.map((value, index) => {
                return (
                  <Todo
                    key={value._id}
                    value={value}
                    index={index}
                    fetchTodos={fetchTodos}
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
      </div>
    </>
  );
}

export default Mytodos;
