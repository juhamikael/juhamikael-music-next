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
      {theme === "dark" || (mounted && <LogoDark className="w-52 h-52" />)}
      {theme === "light" && <LogoLight className="w-52 h-52" />}
    </>
  );
};

export default ShowLogo;
