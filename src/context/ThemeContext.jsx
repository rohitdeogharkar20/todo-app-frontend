import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [username, setUserName] = useState("");
  // const [token, setToken] = useState("")

  const token = localStorage.getItem("token");
  // console.log("ThemeProvider")
  // setToken(localStorage.getItem("token"))

  const toggleTheme = () => {
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      theme == "dark" ? "#37353E" : "#B4DEBD";
  }, [theme]);

  const getDetails = async () => {
    try {
      if (token) {
        const result = await axios.get(`${VITE_BACKEND_URL}/users/myDetails`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(result);
        const { data } = result;
        setUserName(data.username);
      }
    } catch (err) {
      console.error("mydetails error", err);
    }
  };

  useEffect(() => {
    // console.log(token);
    // if (token) {
      getDetails();
    // }
  }, [token]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme, username }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export default ThemeContext;
