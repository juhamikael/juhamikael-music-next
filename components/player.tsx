import { cn } from "@/lib/utils";
import { FC } from "react";
interface IPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  platform: string;
  embed: string;
  height?: string | number;
  className?: string;
}

const Player: FC<IPlayerProps> = ({ platform, embed, className }) => {
  return (
    <>
      {platform === "spotify" && (
        <iframe
          src={embed}
          width="100%"
          className={cn(className, "w-full rounded-2xl")}
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
      {platform === "soundcloud" && (
        <iframe
          className={cn(className, "w-full h-40")}
          width="100%"
          height="166"
          src={embed}
        ></iframe>
      )}
      {platform === "youtube" && (
        <iframe
          className={cn("w-full h-96", className)}
          src={embed}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture;"
        ></iframe>
      )}
    </>
  );
};

export default Player;
