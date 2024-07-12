"use client";

import GoogleSigninButton from "@/components/Header/GoogleSigninButton";
import { useAuth } from "@/context/AuthContext";
import { IconMoon, IconSun, IconUser } from "@tabler/icons-react";
import React, { useEffect } from "react";
import UserHeaderButton from "./UserHeaderButton";
interface HeaderProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ theme, setTheme }: HeaderProps) => {
  const { user, loading } = useAuth();

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
    <main className="flex justify-between items-center w-full max-w-3xl bg-white md:rounded-lg py-3 shadow-md dark:bg-dark-200 dark:text-dark-600">
      <div className="flex flex-col items-start justify-center px-6">
        <p className="text-2xl font-bold  font-montserrat">Rate My Setup</p>
        <p className="text-xs">
          {"By "}
          <a href="https://github.com/jadejamig" target="_blank">
            Jade Jamig
          </a>
        </p>
      </div>
      <div className="flex items-center justify-center  pr-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-stone-100 dark:hover:bg-dark-300"
        >
          {theme === "light" ? <IconSun className="w-6 h-6" /> : <IconMoon className="w-6 h-6" />}
        </button>
        {user || loading ? (
          <UserHeaderButton user={user} />
        ) : (
          <GoogleSigninButton />
        )}
      </div>
    </main>
  );
};

export default Header;
