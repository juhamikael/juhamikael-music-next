import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { IReleases } from "@/types/releases";
import { formatSongName, getDimensionFromUrl } from "@/utils/sanity";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import zoom from "@/app/styles/zoom.module.css";

type TReleaseCardProps = {
  prop?: string;
  children?: React.ReactNode;
  project: IReleases;
  index: number;
};

const ReleaseCard: FC<TReleaseCardProps> = ({ project, index }) => {
  const fullTitle = formatSongName(
    project.mainArtists,
    project.remixerArtists,
    project.featuredArtists,
    project.songTitle
  );
  return (
    <Link
      href={`/releases/${project.slug.current}`}
      data-aos="fade-up"
      data-aos-delay={((index % 3) + 1) * 50}
      data-aos-duration={((index % 3) + 1) * 700}
      data-aos-once="false"
    >
      <Card
        className={cn(
          "flex flex-col min-h-[150px] bg-transparent border-card-foreground/5 group",
          zoom.zoom
        )}
      >
        <CardHeader
          className={cn(
            "flex flex-col lg:flex-row items-center gap-x-4 flex-grow gap-y-2"
          )}
        >
          <Image
            src={project.imageUrl}
            alt={project.slug.current}
            width={getDimensionFromUrl(project.imageUrl).width}
            height={getDimensionFromUrl(project.imageUrl).height}
            className="object-cover w-20 h-20 lg:h-14 lg:w-14 rounded-lg"
            priority
          />
          <CardContent
            className={cn(
              "p-0 truncate transition-colors group-hover:text-primary text-center lg:text-start"
            )}
          >
            <CardTitle className={cn("text-sm")}>{fullTitle.artist}</CardTitle>
            <CardTitle className={cn("text-xs")}>
              {fullTitle.songTitle}
            </CardTitle>
            <CardDescription>
              {new Date(project.releaseDate).toLocaleDateString()}
            </CardDescription>
          </CardContent>
        </CardHeader>
        <CardContent className="text-sm items-center gap-5 flex justify-center lg:justify-normal">
          {project.genreTags.map((genre) => (
            <Badge key={genre.value} className={cn("px-4")}>
              {genre.label}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ReleaseCard;
