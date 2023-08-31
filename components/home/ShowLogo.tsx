"use client";
import { LogoDark, LogoLight } from "@/components/svgs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const ShowLogo = () => {
  const { theme: initialTheme } = useTheme();
  const defaultTheme = "dark";

  const [theme, setTheme] = useState<string | null>(
    initialTheme || defaultTheme
  );

  useEffect(() => {
    if (initialTheme) {
      setTheme(initialTheme);
    }
  }, [initialTheme]);

  return (
    <>
      {theme === "dark" && <LogoDark className="w-52 h-52" />}
      {theme === "light" && <LogoLight className="w-52 h-52" />}
    </>
  );
};

export default ShowLogo;
