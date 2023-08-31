import { ImageAsset } from "sanity";
import { TextBlock } from "./sanity";

export type GenreTag = {
  _type: string;
  label: string;
  _key: string;
  value: string;
};

export type Artists = {
  name: string;
};

export type IReleases = {
  slug: { current: string };
  releaseDate: Date;
  genreTags: GenreTag[];
  imageUrl: string;
  mainImage: ImageAsset;
  _id: string;
  mainArtists: Artists[];
  featuredArtists?: Artists[];
  remixerArtists?: Artists[];
  songTitle: string;
  description: TextBlock[];
  href: {
    stream: string;
    download?: string;
  };
};
