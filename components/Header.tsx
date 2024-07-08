"use client";

import React, { useEffect, useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <main className="flex justify-between items-center w-full max-w-3xl bg-white md:rounded-lg py-3 px-6 shadow-md dark:bg-dark-200 dark:text-dark-600">
      <div className="flex flex-col items-start justify-center">
        <p className="text-2xl font-bold tracking-tight">Rate My Setup</p>
        <p className="text-xs">
          By{" "}
          <a href="https://github.com/jadejamig" target="_blank">
            Jade Jamig
          </a>
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-stone-100 dark:hover:bg-dark-300"
        >
          {theme === "light" ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </main>
  );
};

export default Header;
