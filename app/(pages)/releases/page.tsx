import { cachedClient } from "@/sanity/lib/client";
import { releasesQuery } from "@/sanity/queries/releases";
import { orderByReleaseDate } from "@/utils/sanity";
import Releases from "@/components/releases/ReleaseComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juha Mikael Music | Releases",
  description: "Juha Mikael Releases",
};

const ReleasesPage = async () => {
  const projects = await cachedClient(releasesQuery);
  const sortedProjects = projects.sort(orderByReleaseDate);

  return <Releases projects={sortedProjects} />;
};

export default ReleasesPage;
