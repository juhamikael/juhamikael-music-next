import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReleaseCard from "@/components/home/ReleaseCard";
import { cachedClient } from "@/sanity/lib/client";
import { releasesQuery, getMultipleReleases } from "@/sanity/queries/releases";
import ParticlesComponent from "@/components/particles/Particles";
import type { IReleases } from "@/types/releases";
import Link from "next/link";
import { StraightLine } from "@/components/StraightLine";
import { AosInit } from "@/components/AOS";
import { EmblaCarousel } from "@/components/home/Carousel";
import { logoClass } from "../styles/logo";
import ShowLogo from "@/components/home/ShowLogo";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juha Mikael Music | Home",
  description: "Juha Mikael Home",
};

function sortByReleaseDate(a: IReleases, b: IReleases): number {
  return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
}

export default async function Index() {
  const projects = await cachedClient(releasesQuery);
  const favorites = await cachedClient(getMultipleReleases, {
    slugs: ["weightless", "one-day", "love-you-today-not-forever", "atlantis"],
  });
  const sortedProjects = projects.sort(sortByReleaseDate).slice(0, 6);

  return (
    <div className="flex flex-col gap-y-4">
      <div className={cn(logoClass)}>
        <ShowLogo />
      </div>
      <div className="flex lg:w-6/12 mx-auto">
        <EmblaCarousel projects={favorites} />
      </div>
      <StraightLine className={cn("border-card-foreground/10")} />
      <div className="flex gap-x-4 justify-between">
        <h1 className="font-bold text-4xl">Latest releases</h1>
        <h2>
          <Button className={"rounded-xl bg-card-foreground"}>
            <Link href="/releases">View all releases</Link>
          </Button>
        </h2>
      </div>
      <AosInit>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch ">
          {sortedProjects.map((project: IReleases, index: number) => (
            <ReleaseCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </AosInit>
      <ParticlesComponent />
    </div>
  );
}
