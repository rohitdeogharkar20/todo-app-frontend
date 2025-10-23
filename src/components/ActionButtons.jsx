import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CircleCheckBig, CircleX, Trash, Pencil } from "lucide-react";
import { parseISO, format } from "date-fns";
import UpdateTodo from "./UpdateTodo";

const { VITE_BACKEND_URL } = import.meta.env;

function ActionButtons(props) {
  const { value, fetchTodos, filter } = props;

  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState({
    todoId: "",
    title: "",
    description: "",
    startAt: "",
    endAt: "",
  });

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/todos/deleteTodoById`,
        { todoId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode == 200) {
        toast.success("Todo Delete Success");
        fetchTodos(filter);
      }
    } catch (err) {
      console.log("delete todo error", err);
    }
  };

  const handleCompleteOperation = async (todoId, completeStatus) => {
    try {
      completeStatus == 1 ? (completeStatus = 0) : (completeStatus = 1);

      const response = await axios.post(
        `${VITE_BACKEND_URL}/todos/completeMarkOperation`,
        { todoId, completeStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode == 200) {
        toast.success(response.data.message);
        fetchTodos(filter);
      }
    } catch (err) {
      console.log("complete operation error", err);
    }
  };

  const handleUpdate = async (id, completeStatus) => {
    if (completeStatus == 1) {
      toast.success("Todo marked as complete! cannot udpate");
      return;
    }
    setShowModal(true);
    try {
      const response = await axios.get(
        `${VITE_BACKEND_URL}/todos/getToDoById?todoId=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { todoId, title, description, startAt, endAt } =
        response.data.data[0];

      setUpdate({
        todoId: todoId,
        title: title,
        description: description,
        startAt: startAt ? format(parseISO(startAt), "yyyy-MM-dd'T'HH:mm") : "",
        endAt: endAt ? format(parseISO(endAt), "yyyy-MM-dd'T'HH:mm") : "",
      });
    } catch (err) {
      console.log("udpate data show error", err);
    }
  };

  return (
    <>
      <div className="text-right font-poppins">
        <button
          title={
            value.completeStatus === 0
              ? "Mark as Complete"
              : "Mark as Incomplete"
          }
          className="p-2 hover:bg-gray-100 rounded-md transition-colors text-green-600 hover:text-green-700"
          onClick={() =>
            handleCompleteOperation(value.todoId, value.completeStatus)
          }
        >
          {value.completeStatus === 0 ? (
            <CircleCheckBig size={20} />
          ) : (
            <CircleX size={20} />
          )}
        </button>

        <button
          title="Edit Todo"
          aria-label="Edit Todo"
          className="p-2 hover:bg-gray-100 rounded-md transition-colors text-blue-600 hover:text-blue-700"
          onClick={() => handleUpdate(value.todoId, value.completeStatus)}
        >
          <Pencil size={20} />
        </button>

        <button
          title="Delete Todo"
          aria-label="Delete Todo"
          className="p-2 hover:bg-gray-100 rounded-md transition-colors text-red-600 hover:text-red-700"
          onClick={() => handleDelete(value.todoId)}
        >
          <Trash size={20} />
        </button>
      </div>

      {showModal ? (
        <UpdateTodo
          update={update}
          setShowModal={setShowModal}
          setUpdate={setUpdate}
          fetchTodos={fetchTodos}
          filter={filter}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ActionButtons;
