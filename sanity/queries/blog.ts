import { groq } from "next-sanity";

export const getPosts = groq`*[_type == "blog" && defined(slug.current)]{
    title, body, slug, author,mainImage, publishedAt, blogTags[], description, _updatedAt, "imageUrl": mainImage.asset->url
  }
`;

export const getPost = groq`
*[_type == "blog" && slug.current == $slug]{
  _id, title, body, slug, author,mainImage, publishedAt, publishedAt, blogTags[], description, _updatedAt, "imageUrl": mainImage.asset->url
}[0]
`;
