"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import style from "./embla.module.css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HiOutlineHand as Hand } from "react-icons/hi";
import type { IReleases } from "@/types/releases";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Link from "next/link";

export const EmblaCarousel = ({ projects }: { projects: IReleases[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="flex justify-center flex-col ">
      <div className="overflow-hidden " ref={emblaRef}>
        <div className="flex ">
          {projects.map((project: IReleases, index: number) => (
            <Link
              href={`/releases/${project.slug.current}`}
              key={project._id}
              className={cn(style.emblaSlide)}
              aria-label={project.songTitle}
            >
              <Image
                src={project.imageUrl || ""}
                alt={project._id}
                width={1200}
                height={1200}
                className="rounded-xl"
                priority
              />
            </Link>
          ))}
        </div>
        <div className={cn("flex justify-end text-xs -translate-y-7 py-2  ")}>
          <p className="flex gap-x-4 bg-gray-950/40 text-white px-6 rounded-tl-xl">
            <span>Swipe left or right</span>{" "}
            <Hand className="h-5 w-5 rotate-45" />
          </p>
        </div>
        <div className="flex items-center mt-8">
          <button
            aria-label="Previous slide"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <BsFillArrowLeftCircleFill className="h-10 w-10 text-card-foreground hover:text-primary" />
          </button>

          <div className="p-4 text-sm lg:text-xl uppercase text-card-foreground w-full text-center font-black">
            My personal favorites
          </div>

          <button
            aria-label="Next slide"
            onClick={() => emblaApi?.scrollNext()}
          >
            <BsFillArrowRightCircleFill className="h-10 w-10 text-card-foreground hover:text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};
