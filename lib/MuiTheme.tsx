import { createTheme } from "@mui/material";
import { use, useEffect, useState } from "react";

export default function MuiTheme() {
  const [theme, setTheme] = useState(window?.localStorage?.getItem("theme") || "light");

  // const [user, setUser] = useState<User | null>(() => {
  //   if (typeof window !== "undefined") {
  //     const storedUser = localStorage.getItem("user");
  //     return storedUser ? JSON.parse(storedUser) : null;
  //   }
  //   return null;
  // });

  // const [theme, setTheme] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const storedTheme = localStorage.getItem("theme");
  //     return storedTheme ? storedTheme : "light";
  //   }
  //   return "light";
  // });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return [theme, theme === "dark" ? darkTheme : lightTheme, setTheme];
}
