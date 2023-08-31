import { cn } from "@/lib/utils";
import React, { FC } from "react";
interface IStarightLineProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: string;
}
/**
 * Opacity of the line
 * @default border-card-foreground/40
 *
 * @type {string}
 *
 * @example
 * ---
 * <StraightLine opacity="border-card-foreground/20" />
 * ---
 * <StraightLine opacity="border-blue-200/20" />
 * Should be in tailwindcss format:
 * border-<color>/<opacity>
 */
export const StraightLine: FC<IStarightLineProps> = ({
  className,
  opacity,
}) => {
  const opacityValue = opacity ? opacity : "border-card-foreground/40";
  return <div className={cn("border-b my-2", opacityValue, className)}></div>;
};
