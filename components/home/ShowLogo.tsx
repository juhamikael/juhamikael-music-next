"use client";
import { LogoDark, LogoLight } from "@/components/svgs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const ShowLogo = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {theme === "system" && mounted === true && (
        <LogoDark className="w-52 h-52" />
      )}
      {theme === "dark" && mounted === true && (
        <LogoDark className="w-52 h-52" />
      )}
      {theme === "light" && mounted === true && (
        <LogoLight className="w-52 h-52" />
      )}
    </>
  );
};

export default ShowLogo;
