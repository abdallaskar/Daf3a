import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const getTheme = localStorage.getItem("theme") === "dark";
  const [isDark, setIsDark] = useState(getTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
