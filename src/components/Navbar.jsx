import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { VITE_BACKEND_URL } = import.meta.env;

function Navbar() {
  const { theme, toggleTheme, username } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <nav
      style={{ background: "#FFF7DD" }}
      className="text-black shadow-md font-poppins"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide hover:text-blue-400 cursor-pointer">
          Todo App
        </h1>

        <div className="flex items-center gap-6">
          <button className="hover:text-blue-400 transition-colors">
            Home
          </button>
          <button
            onClick={() => navigate("/chat")}
            className="hover:text-blue-400 transition-colors"
          >
            Chat
          </button>
          <button className="hover:text-blue-400 transition-colors">
            Tasks
          </button>
          <button className="hover:text-red-400 transition-colors">
            Logout
          </button>
          <button onClick={toggleTheme}>
            {theme == "dark" ? "Light" : "Dark"}
          </button>
          <span>{username}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
