"use client";
import { FC, useState, useEffect, use } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import zoom from "@/app/styles/zoom.module.css";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import type { IReleases } from "@/types/releases";
import { getDimensionFromUrl, formatSongName } from "@/utils/sanity";
import Link from "next/link";
import { AosInit } from "../AOS";
import { StraightLine } from "../StraightLine";
type IReleasesProps = {
  prop?: string;
  children?: React.ReactNode;
  projects: IReleases[];
};

const years = {
  2023: "2023",
  2022: "2022",
  2021: "2021",
  2020: "2020",
  2019: "2019",
  2018: "2018",
  2017: "2017",
  2016: "2016",
  2015: "2015",
  2014: "2014",
  2013: "2013",
};

const Releases: FC<IReleasesProps> = ({ projects }) => {
  const [filter, setFilter] = useState(projects);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchedArtist, setSearchedArtist] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const applyFilters = (genre: string, year: string, artist: string) => {
    console.log(
      `Applying filters. Genre: ${genre}, Year: ${year}, Artist: ${artist}`
    );

    const filteredProjects = projects.filter((project) => {
      let releaseYear: string;

      if (typeof project.releaseDate === "string") {
        releaseYear = (project.releaseDate as string).split("-")[0];
      } else if (project.releaseDate instanceof Date) {
        releaseYear = project.releaseDate.getFullYear().toString();
      } else {
        console.error(`Unknown releaseDate format: ${project.releaseDate}`);
        return false;
      }

      const isGenreMatched = project.genreTags.some((tag) =>
        tag.label.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
      );

      const isArtistMatched = artist
        ? project.mainArtists.some((mainArtist) =>
            mainArtist.name.toLowerCase().includes(artist.toLowerCase())
          ) ||
          project.featuredArtists?.some((featuredArtist) =>
            featuredArtist.name.toLowerCase().includes(artist.toLowerCase())
          ) ||
          project.remixerArtists?.some((remixerArtist) =>
            remixerArtist.name.toLowerCase().includes(artist.toLowerCase())
          )
        : true;

      const isYearMatched = year ? releaseYear === year : true;

      console.log(
        `Project release year: ${releaseYear}. Is genre matched: ${isGenreMatched}. Is year matched: ${isYearMatched}. Is artist matched: ${isArtistMatched}`
      );

      return isGenreMatched && isYearMatched && isArtistMatched;
    });

    setFilter(filteredProjects);
  };

  const onGenreChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    applyFilters(genre, selectedYear, searchedArtist);
  };

  const onArtistChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const artist = e.target.value;
    setSearchedArtist(artist);
    applyFilters(selectedGenre, selectedYear, artist);
  };

  const handleYearChange = (year: string) => {
    console.log(`Year selected: ${year}`);
    if (year === "Show All") {
      year = "";
    }
    setSelectedYear(year);
    applyFilters(selectedGenre, year, searchedArtist);
  };

  return (
    <>
      <div className="mt-4">
        <Label className={cn("text-3xl font-semibold")}>
          Filter by Year, Artist or Genre
        </Label>
        <div className="flex gap-x-4 my-4">
          <Select onValueChange={handleYearChange}>
            <SelectTrigger
              className={cn("text-muted-foreground")}
              aria-label="Select year"
            >
              <SelectValue>{selectedYear || "Year"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Show All">Show All</SelectItem>
              {Object.keys(years)
                .sort((a, b) => Number(b) - Number(a))
                .map((year) => {
                  return (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          <Input
            onChange={onArtistChangeHandler}
            type="text"
            placeholder="Artist"
            className={cn("w-full")}
          />
          <Input
            onChange={onGenreChangeHandler}
            type="text"
            placeholder="Genre"
            className={cn("w-full")}
          />
        </div>
        <div className="flex gap-x-2.5">
          {selectedYear && (
            <Label className={cn("text-3xl font-semibold")}>
              Showing releases in {selectedYear}
            </Label>
          )}
          {searchedArtist && (
            <Label className={cn("text-3xl font-semibold")}>
              {" | "}
              {searchedArtist.toLocaleLowerCase().includes("juha") ||
              searchedArtist.toLocaleLowerCase().includes("visi")
                ? `By Me`
                : `With ${searchedArtist}`}{" "}
            </Label>
          )}
          {selectedGenre && (
            <Label className={cn("text-3xl font-semibold")}>
              {" | "}
              Genre {selectedGenre}
            </Label>
          )}
        </div>
        <StraightLine className="border-card-foreground/10" />
        <AosInit>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {filter.map((project: IReleases, index: number) => {
              if (!project) {
                return null;
              }

              const fullTitle = formatSongName(
                project.mainArtists,
                project.remixerArtists,
                project.featuredArtists,
                project.songTitle
              );
              const { width, height } = getDimensionFromUrl(project.imageUrl);

              return (
                <Link
                  key={project._id}
                  className={cn("group ", zoom.zoom)}
                  href={`/releases/${project.slug.current}`}
                  data-aos="fade-up"
                  data-aos-delay={((index % 3) + 1) * 50}
                  data-aos-duration={((index % 3) + 1) * 700}
                  data-aos-once="false"
                >
                  <Card
                    className={cn("my-4 bg-transparent rounded-xl ")}
                    key={project._id}
                  >
                    <CardHeader
                      className={cn(
                        "flex justify-center px-0 pt-0 rounded-xl  "
                      )}
                    >
                      <Image
                        className="mx-auto rounded-t-xl "
                        src={project.imageUrl}
                        alt={project.songTitle}
                        width={width > 1000 ? 1000 : width}
                        height={height > 1000 ? 1000 : height}
                        priority
                      />
                    </CardHeader>
                    <CardContent className={cn("flex flex-col flex-grow ")}>
                      <CardDescription
                        className={cn(
                          "text-sm font-bold group-hover:text-primary transition-colors truncate"
                        )}
                      >
                        {fullTitle.artist}
                      </CardDescription>
                      <CardDescription
                        className={cn(
                          "text-xs group-hover:text-primary transition-colors truncate"
                        )}
                      >
                        {fullTitle.songTitle}
                      </CardDescription>

                      <CardDescription className={cn("text-sm font-bold mt-4")}>
                        {new Date(project.releaseDate).toLocaleDateString(
                          "en-GB",
                          {}
                        )}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className={"flex-grow  "}>
                      <div className={cn("flex flex-wrap gap-y-2 gap-x-4")}>
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
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        </AosInit>
      </div>
    </>
  );
};

export default Releases;
