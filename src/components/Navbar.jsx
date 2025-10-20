import React, { useContext } from "react";
import ThemeContext from "./context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
          <button className="hover:text-blue-400 transition-colors">
            Tasks
          </button>
          <button className="hover:text-red-400 transition-colors">
            Logout
          </button>
          <button onClick={toggleTheme}>
            {theme == "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
