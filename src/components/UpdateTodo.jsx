import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TodoModal from "./TodoModal";

const { VITE_BACKEND_URL } = import.meta.env;

function UpdateTodo(props) {
  const { update, setShowModal, setUpdate, fetchTodos, filter } = props;

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    if (update.title == "" || update.description == "") {
      setMessage("Title and description fields are required!");
      return;
    }

    if (update.title.length > 20) {
      setMessage("Title can be of max 20 letters!");
      return;
    }

    if (update.startAt) {
      if (new Date(update.startAt) < new Date()) {
        setMessage("Start date cannot be less than current date");
        return;
      }
    }

    if (update.endAt) {
      if (new Date(update.endAt) < new Date()) {
        setMessage("End date cannot be less than current date");
        return;
      }
      if (new Date(update.endAt) < new Date(update.startAt)) {
        setMessage("End date cannot be less than start date");
        return;
      }
    }

    try {
      const updatedData = {
        todoId: update.todoId,
        title: update.title,
        description: update.description,
        startAt: update.startAt ? new Date(update.startAt).toISOString() : "",
        endAt: update.endAt ? new Date(update.endAt).toISOString() : "",
      };

      const response = await axios.post(
        `${VITE_BACKEND_URL}/todos/updateTodoById`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode == 200) {
        toast.success(response.data.message);
        setShowModal(false);
        setUpdate({ title: "", description: "" });
        fetchTodos(filter);
      }
    } catch (err) {
      console.log("udpate data submit error", err);
    }
  };
  return (
    <>
      <TodoModal
        data={update}
        change={handleUpdateChange}
        submit={handleUpdateSubmit}
        message={message}
        setShowModal={setShowModal}
        setMessage={setMessage}
        operation="update"
      />
    </>
  );
}

export default UpdateTodo;
