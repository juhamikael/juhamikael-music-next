"use client";

import AOS from "aos";
import type { ReactNode } from "react";
import { useEffect } from "react";

import "aos/dist/aos.css";

export const AosInit = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return <>{children}</>;
};
