"use client";
import { PortableText } from "@portabletext/react";
import { prose } from "@/app/styles/prose";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getDimensionFromUrl } from "@/utils/sanity";
import { useTheme } from "next-themes";

import type { TAboutMe } from "@/types/about";

const AboutPageClient = ({ about }: { about: TAboutMe }) => {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <div>
      <div className="flex flex-col lg:flex-row mt-10">
        <Image
          src={about.darkImageUrl}
          alt={about.slug.current}
          width={getDimensionFromUrl(about.darkImageUrl).width}
          height={getDimensionFromUrl(about.darkImageUrl).height}
          className="w-96 h-96 rounded-xl object-cover border mb-10 lg:mb-0"
        />

        <div className={cn("prose", prose)}>
          <PortableText
            value={about.text}
            components={{
              marks: {
                link: ({ children, value }) => {
                  const rel = !value.href.startsWith("/")
                    ? "noreferrer noopener"
                    : undefined;
                  return (
                    <a href={value.href} rel={rel} target={"_blank"}>
                      {children}
                    </a>
                  );
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPageClient;
