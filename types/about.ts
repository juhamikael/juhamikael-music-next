import { ImageAsset } from "sanity";
import type { PortableText } from "@portabletext/react";
import { Artists, GenreTag } from "./releases";
import { TextBlock } from "./sanity";
export type TAboutMe = {
  title: string;
  slug: { current: string };
  text: TextBlock[];
  lightImageUrl: string;
  darkImageUrl: string;
  _id: string;
};
