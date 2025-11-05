import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTodo from "../components/todo/Createtodo";
import Todofilter from "../components/todo/TodoFilter";
import TodoBar from "../components/todo/TodoBar";
import TodoDetails from "../components/todo/TodoDetails";
import { addDays, startOfDay, format, subDays, endOfDay } from "date-fns";

const { VITE_BACKEND_URL } = import.meta.env;

function Mytodos() {
  const [todos, setTodos] = useState([]);
  const [showTodo, setShowTodo] = useState([]);
  const [filter, setFilter] = useState({
    startAt: "today",
  });

  const token = localStorage.getItem("token");

  const fetchTodos = async (filter) => {
    const postData = {
      filter: createFilter(filter),
      page: 1,
      limit: 10,
    };

    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/todos/getTodoList`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;
      setTodos(data);
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

  const createFilter = (filter) => {
    if (filter) {
      if (filter.startAt) {
        if (filter.startAt == "yesterday") {
          filter.startAt = {
            $gt: startOfDay(subDays(new Date(), 1)).toISOString(),
            $lt: endOfDay(subDays(new Date(), 1)).toISOString(),
          };
        }
        if (filter.startAt == "today") {
          filter.startAt = {
            $gt: startOfDay(new Date()).toISOString(),
            $lt: endOfDay(new Date()).toISOString(),
          };
        }
        if (filter.startAt == "tomorrow") {
          filter.startAt = {
            $gt: startOfDay(addDays(new Date(), 1)).toISOString(),
            $lt: endOfDay(addDays(new Date(), 1)).toISOString(),
          };
        }
      }
    } else {
      console.log("invalid filter");
      return;
    }

    return filter;
  };

  const closeTodo = (value) => {
    setShowTodo((prev) => prev.filter((item) => item._id != value._id));
  };

  useEffect(() => {
    fetchTodos(filter);
  }, []);

  useEffect(() => {
    if (showTodo && todos) {
      if (showTodo.length > 0 && todos.length > 0) {
        setShowTodo((prev) =>
          prev
            .map((selected) => todos.find((t) => t._id === selected._id))
            .filter(Boolean)
        );
      }
    }
  }, [todos]);

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
            <CreateTodo
              className="fixed"
              filter={filter}
              fetchTodos={fetchTodos}
            />
            <Todofilter
              filter={filter}
              setFilter={setFilter}
              fetchTodos={fetchTodos}
            />
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
                    filter={filter}
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
