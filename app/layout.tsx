"use client";

import Header from "@/components/Header/Header";
import MuiTheme from "@/lib/MuiTheme";
import { Theme, ThemeProvider } from "@mui/material/styles";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [themeString, muiTheme, setTheme] = MuiTheme();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <title>Rate My Setup</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💯</text></svg>"
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider theme={muiTheme as Theme}>
            <main className="flex min-h-screen flex-col md:gap-3 items-center justify-start md:pt-10 md:pb-4 bg-zinc-100 dark:bg-dark-100">
              <Header
                theme={themeString as string}
                setTheme={
                  setTheme as React.Dispatch<React.SetStateAction<string>>
                }
              />
              {children}
              <Toaster richColors={true} position="top-center" />
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
