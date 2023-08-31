import { FC } from "react";
import { cachedClient } from "@/sanity/lib/client";
import { getSingleRelease } from "@/sanity/queries/releases";
import { parsePlatform, matchPlatformAndGetId } from "@/utils/player";
import Player from "@/components/player";
import {
  Card,
  CardContent,
  CardDescriptionBlog as CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatSongName } from "@/utils/sanity";
import { Button } from "@/components/ui/button";
import { BsFillArrowLeftCircleFill as ArrowLeft } from "react-icons/bs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IReleases } from "@/types/releases";
import { PortableText } from "@portabletext/react";
import { StraightLine } from "@/components/StraightLine";
import { Metadata } from "next";
type IReleasePageProps = {
  params: {
    slug: string;
  };
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = (await cachedClient(getSingleRelease, {
    slug: params.slug,
  })) as IReleases;

  const fullTitle = formatSongName(
    project.mainArtists,
    project.remixerArtists,
    project.featuredArtists,
    project.songTitle
  );

  try {
    return {
      title: `Juha Mikael | ${fullTitle.artist} - ${fullTitle.songTitle}`,
      description: `${fullTitle.artist} - ${fullTitle.songTitle}`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: `JM | Releases | NaN`,
      description: `NaN`,
    };
  }
}

const ReleasePage: FC<IReleasePageProps> = async ({ ...props }) => {
  const project = (await cachedClient(getSingleRelease, {
    slug: props.params.slug,
  })) as IReleases;

  const fullTitle = formatSongName(
    project.mainArtists,
    project.remixerArtists,
    project.featuredArtists,
    project.songTitle
  );

  const platform = parsePlatform(project.href.stream);
  const embed = matchPlatformAndGetId(project.href.stream)?.embed;
  return (
    <>
      <Card className={cn("bg-transparent border-0 rounded-2xl")}>
        <CardHeader className={cn("px-0 pt-0 my-4 mx-auto")}>
          <Player
            embed={embed || ""}
            platform={platform || ""}
            className="w-full rounded-2xl "
          />
        </CardHeader>
        <StraightLine className={cn("border-card-foreground/10 mb-10")} />
        <CardContent className={"border p-6 rounded-2xl"}>
          <div className="flex items-center gap-x-4">
            <Image
              src={project.imageUrl}
              alt={project.songTitle}
              width={120}
              height={120}
              className={cn("rounded-2xl")}
            />
            <div className="">
              <Button
                className={cn(" bg-card-foreground dark:text-[#0f0f0f] mb-2")}
              >
                <Link
                  className="flex items-center font-bold gap-x-4"
                  href="/releases"
                >
                  <ArrowLeft />
                  <span>Back to releases</span>
                </Link>
              </Button>
              <CardTitle className={cn("text-sm lg:text-base font-bold")}>
                {fullTitle.artist}
              </CardTitle>
              <CardTitle className={cn("text-xs lg:text-sm font-bold")}>
                {fullTitle.songTitle}
              </CardTitle>
              <CardDescription>
                {new Date(project.releaseDate).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
          {project.description && (
            <CardDescription className={cn("mt-4")}>
              <PortableText value={project.description} />
            </CardDescription>
          )}
          <div className={cn("flex flex-wrap gap-y-2 gap-x-4 my-4")}>
            {project.genreTags.map((tag, index) => {
              return (
                <Badge
                  key={index}
                  className={cn("text-xs font-bold rounded-xl")}
                >
                  {tag.label}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ReleasePage;
