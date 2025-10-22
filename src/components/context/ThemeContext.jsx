import React, { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      theme == "dark" ? "#37353E" : "#B4DEBD";
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export default ThemeContext;
