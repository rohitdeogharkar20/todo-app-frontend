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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r  font-poppins">
        <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8 border border-blue-200 animate-slideIn">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
            Register
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            {message?.message?.username?.message && (
              <div className="text-red-500 text-sm">
                {message.message.username.message}
              </div>
            )}

            {/* Email */}
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            {message?.message?.email?.message && (
              <div className="text-red-500 text-sm">
                {message.message.email.message}
              </div>
            )}

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            {message?.message?.password?.message && (
              <div className="text-red-500 text-sm">
                {message.message.password.message}
              </div>
            )}

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            {message?.message?.confirmPassword?.message && (
              <div className="text-red-500 text-sm">
                {message.message.confirmPassword.message}
              </div>
            )}

            {/* Success Message */}
            {message?.statusCode === 201 && (
              <div className="text-green-600 text-center text-sm font-medium">
                {message.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Register"}
            </button>
          </form>

          {/* Go to Login Section */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Registration;
