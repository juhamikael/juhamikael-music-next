import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import category from "./schemas/category";
import post from "./schemas/post";
import author from "./schemas/author";
import releases from "./schemas/releases";
import artists from "./schemas/artists";
import productType from "./schemas/productType";
import downloads from "./schemas/downloads";
import contactForm from "./schemas/contactForm";
import about from "./schemas/about";
import blog from "./schemas/blog";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    releases,
    downloads,
    artists,
    post,
    about,
    blog,
    blockContent,
    author,
    category,
    productType,
    contactForm,
  ],
};
