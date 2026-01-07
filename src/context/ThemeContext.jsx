import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    let initial;
    if (stored === "true" || stored === "false") {
      initial = stored === "true";
    } else {
      initial = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    setDarkMode(initial);
    if (initial) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const toggle = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", next ? "true" : "false");
      if (next) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default ThemeContext;
