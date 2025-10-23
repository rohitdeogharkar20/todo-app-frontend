import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BellPlus, X } from "lucide-react";
import TodoModal from "./TodoModal";

const { VITE_BACKEND_URL } = import.meta.env;

function CreateTodo(props) {

  const {filter, fetchTodos} = props

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    startAt: "",
    endAt: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("first", form.startAt);

    if (form.title == "" || form.description == "") {
      setMessage("Title and description fields are required!");
      return;
    }

    if (form.startAt == "") {
      setMessage("Start Time is required");
      return;
    }

    if (isNaN(new Date(form.startAt).getTime())) {
      setMessage("Start Date is not Valid");
      return;
    }

    if (form.title.length > 20) {
      setMessage("Title can be of max 20 letters!");
      return;
    }

    if (form.startAt) {
      if (new Date(form.startAt) < new Date()) {
        setMessage("Start date cannot be less than current date");
        return;
      }
    }

    if (form.endAt) {
      if (new Date(form.endAt) < new Date()) {
        setMessage("End date cannot be less than current date");
        return;
      }
      if (new Date(form.endAt) < new Date(form.startAt)) {
        setMessage("End date cannot be less than start date");
        return;
      }
    }

    try {
      form.startAt = form.startAt ? new Date(form.startAt).toISOString() : "";
      form.endAt = form.endAt ? new Date(form.endAt).toISOString() : "";

      const response = await axios.post(
        `${VITE_BACKEND_URL}/todos/CreateTodo`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.statusCode == 200) {
        toast.success("Todo created successfully!");
        setShowModal(false);
        setMessage("");
        setForm({ title: "", description: "" });
        fetchTodos(filter);
      }
      if (response.data.statusCode == 201) {
        setMessage(response.data.message);
      }
    } catch (err) {
      toast.error("Error Occured");
      console.log("create todo error", err);
    }
  };

  return (
    <>
      <button
        className="mb-3"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <BellPlus />
      </button>

      {showModal ? (
        <TodoModal
          data={form}
          change={handleChange}
          submit={handleSubmit}
          message={message}
          setShowModal={setShowModal}
          setMessage={setMessage}
          operation="create"
        />
      ) : (
        ""
      )}
    </>
  );
}

export default CreateTodo;
