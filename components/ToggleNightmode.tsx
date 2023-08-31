"use client";

import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { BsFillMoonFill as Moon } from "react-icons/bs";
import { HiSun as Sun } from "react-icons/hi";

interface ToggleNightModeProps extends React.HTMLAttributes<HTMLDivElement> {
  hideBackground?: boolean;
}

export const ToggleNightMode: FC<ToggleNightModeProps> = ({
  className,
  hideBackground = false,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`${className}`}>
      {theme === "light" ? (
        <Button
          id="toggle-nightmode"
          aria-label="Toggle nightmode"
          onClick={() => setTheme("dark")}
          className={`w-fit h-10 gap-4 items-center text-primary rounded-xl p-2 ${
            hideBackground
              ? "bg-transparent  hover:bg-primary/20 hover:text-primary"
              : "bg-secondary opacity-100"
          }`}
        >
          <Moon className="h-[1remx] w-[1rem] md:h-[1.2rem] md:w-[1.2rem]" />
        </Button>
      ) : (
        <Button
          id="toggle-nightmode"
          aria-label="Toggle nightmode"
          variant="outline"
          onClick={() => setTheme("light")}
          className={`w-fit h-10 gap-4 rounded-xl p-2 opacity-100 text-primary
          ${
            hideBackground
              ? "bg-transparent  hover:bg-primary/20 hover:text-primary"
              : "bg-secondary "
          }
          `}
        >
          <Sun className="h-[1remx] w-[1rem] md:h-[1.2rem] md:w-[1.2rem]" />
        </Button>
      )}
    </div>
  );
};
