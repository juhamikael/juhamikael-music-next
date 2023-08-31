"use client";
import Link from "next/link";
import React, { FC } from "react";
import { IconsObject } from "./IconsObject";
import type { LinkKey } from "./IconsObject";
import zoom from "@/app/styles/zoom.module.css";
import { cn } from "@/lib/utils";
export type IIconDetail = {
  key: string;
  link?: LinkKey;
};

export type IContactIconsProps = {
  isOpen?: boolean;
  icons: IIconDetail[];
};

const Icons: FC<IContactIconsProps> = ({ icons, isOpen = false }) => {
  return (
    <div
      className={`ml-4 flex flex-col gap-y-2 lg:space-y-0 lg:flex-row lg:space-x-2 ${
        isOpen ? "block" : "hidden lg:flex"
      }`}
    >
      {icons.map(({ key, link }) => {
        const iconDetails = IconsObject[key];
        if (!iconDetails) return null;

        const IconComponent: FC<React.HTMLAttributes<HTMLDivElement>> =
          iconDetails.icon;
        const href = link ? iconDetails.href : iconDetails.href;

        return (
          <div key={`${key}-${link || "main"}`}>
            <Link
              aria-label={link || "main"}
              target="_blank"
              className="transition-colors text-card-foreground hover:text-primary"
              href={href || "/"}
            >
              <IconComponent
                style={{
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
                className={cn("text-2xl", zoom.iconZoom)}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Icons;
