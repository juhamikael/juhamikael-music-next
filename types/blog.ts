import { TextBlock } from "./sanity";
import { BlogTags } from "@/seo/blogTags";

export interface IPost {
  body: TextBlock[];
  slug: {
    current: string;
  };
  publishedAt: Date;
  blogTags: typeof BlogTags;
  _updatedAt: Date;
  imageUrl: string;
  title: string;
  _id: string;
  mainImage: any;
  description: TextBlock[];
}
