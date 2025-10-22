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
          localStorage.setItem("username", response.data.username);
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
      <div className="animate-slideIn flex items-center justify-center min-h-screen bg-gradient-to-r  font-[Poppins]">
        <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Error Messages */}
            {message && (
              <div className="text-red-500 text-sm text-center">
                {message.wrongCredentials || message.mandate || ""}
              </div>
            )}

            {/* Username */}
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Login"}
            </button>
          </form>

          {/* Register Section */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
