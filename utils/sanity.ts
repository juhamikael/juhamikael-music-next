import type { IReleases, Artists } from "@/types/releases";

const orderByReleaseDate = (a: IReleases, b: IReleases) => {
  return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
};

const getDimensionFromUrl = (
  url: string
): { width: number; height: number } => {
  if (!url) {
    return { width: 0, height: 0 };
  }

  const fileName = new URL(url).pathname.split("/").pop();
  if (!fileName) return { width: 0, height: 0 };
  const dimensionPart = fileName.split(".").shift()?.split("-").pop();
  if (!dimensionPart) return { width: 0, height: 0 };
  const dimensions = dimensionPart.split("x").map((px) => parseInt(px));
  return {
    width: dimensions[0] || 0,
    height: dimensions[1] || 0,
  };
};

const formatArtists = (artists: Artists[]): string => {
  if (artists.length === 1) {
    return artists[0].name;
  }
  return artists.map((artist) => artist.name).join(" & ");
};

const formatSongName = (
  mainArtists: Artists[],
  remixerArtists: Artists[] | undefined,
  featuredArtists: Artists[] | undefined,
  songTitle: string
) => {
  return {
    artist: `${formatArtists(mainArtists)} ${
      featuredArtists ? `feat. ${formatArtists(featuredArtists)}` : ""
    }`,
    songTitle: `${songTitle} ${
      remixerArtists ? `(${formatArtists(remixerArtists)} Remix)` : ""
    }`,
  };
};

export { orderByReleaseDate, getDimensionFromUrl, formatSongName };
