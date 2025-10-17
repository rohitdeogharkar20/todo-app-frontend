import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BellPlus } from "lucide-react";

const { VITE_BACKEND_URL } = import.meta.env;

function Createtodo(props) {
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

    if (form.title == "" || form.description == "") {
      setMessage("Title and description fields are required!");
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
        `${VITE_BACKEND_URL}/todos/createTodo`,
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
        props.renderList();
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
        onClick={() => {
          setShowModal(true);
        }}
      >
        <BellPlus />
      </button>

      {showModal ? (
        <div className="container createTodoModal">
          <div className="message">{message ? message : ""}</div>

          <button
            onClick={() => {
              setShowModal(false);
              setMessage("");
            }}
          >
            Close
          </button>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 m-2 rounded"
          />

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 m-2 rounded"
          />

          <input
            type="datetime-local"
            id="startAt"
            value={form.startAt}
            name="startAt"
            onChange={handleChange}
            placeholder="startAt"
          />

          <input
            type="datetime-local"
            id="endAt"
            value={form.endAt}
            name="endAt"
            onChange={handleChange}
            placeholder="endAt"
          />

          <button onClick={handleSubmit}>Create</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Createtodo;
