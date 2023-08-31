import { ImageAsset } from "sanity";
import { TextBlock } from "@/types/sanity";
import { Artists, GenreTag } from "./releases";
type MusicMetadata = {
  bpm: number;
  key: string;
  format: { _type: string; _key: string; label: string; value: string }[];
  genre: GenreTag[];
};

export type IProducts = {
  slug: { current: string };
  releaseDate: Date;
  genreTags: GenreTag[] | null;
  imageUrl: string;
  mainImage: ImageAsset;
  musicMetadata: MusicMetadata | null;
  _id: string;
  productType: string;
  price: number;
  mainArtists: Artists[];
  featuredArtists?: Artists[];
  remixerArtists?: Artists[];
  songTitle: string;
  description: TextBlock[] | null;
  href: {
    preview: string;
    lemonsqueezeHref?: string;
  };
};
