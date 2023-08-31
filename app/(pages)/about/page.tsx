import { aboutMe } from "@/sanity/queries/about";
import { cachedClient } from "@/sanity/lib/client";
import type { TAboutMe } from "@/types/about";
import AboutPageClient from "@/components/about/AboutPageClient";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juha Mikael Music | About",
  description: "About Juha Mikael Music",
};

const AboutPage = async () => {
  const about = (await cachedClient(aboutMe)) as TAboutMe;
  return <AboutPageClient about={about} />;
};

export default AboutPage;
