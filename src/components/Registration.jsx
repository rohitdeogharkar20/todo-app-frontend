import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { VITE_BACKEND_URL } = import.meta.env;

function Registration() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/users/registerUser`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.statusCode == 200) {
        toast.success("User Registered Successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      setMessage(response.data);
    } catch (err) {
      console.log("registeration error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <form className="container" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="border p-2 m-2 rounded"
          />

          <div className="message">
            {message && message.message.username
              ? message.message.username.message
              : ""}
          </div>
          <div className="message">
            {message && message.statusCode == 201 ? message.message : ""}
          </div>

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 m-2 rounded"
          />

          <div className="message">
            {message && message.message.email
              ? message.message.email.message
              : ""}
          </div>

          <input
            type="text"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 m-2 rounded"
          />

          <div className="message">
            {message && message.message.password
              ? message.message.password.message
              : ""}
          </div>

          <input
            type="text"
            name="confirmPassword"
            placeholder="Confirm  Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border p-2 m-2 rounded"
          />

          <div className="message">
            {message && message.message.confirmPassword
              ? message.message.confirmPassword.message
              : ""}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Registration;
