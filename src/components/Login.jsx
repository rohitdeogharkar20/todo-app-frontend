import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { VITE_BACKEND_URL } = import.meta.env;

function Login(props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
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
      if (form.username == "" || form.password == "") {
        setMessage({ mandate: "Username and Password is required" });
      } else {
        const response = await axios.post(
          `${VITE_BACKEND_URL}/users/loginUser`,
          form,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (response.data.statusCode == 201) {
          setMessage({ wrongCredentials: response.data.message });
        }
        if (response.data.statusCode == 200) {
          localStorage.setItem("token", response.data.token);
          props.setIsAuthenticated(true);
          navigate("/mytodo");
          toast.success("User Logged In Successfully!");
        }
      }
    } catch (err) {
      console.log("login error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container flex items-center justify-center border border-blue-800">
        <form onSubmit={handleSubmit}>
          <div>
            {message && message.wrongCredentials
              ? message.wrongCredentials
              : ""}
          </div>
          <div>{message && message.mandate ? message.mandate : ""}</div>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submiting..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
