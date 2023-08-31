import { groq } from "next-sanity";
export const aboutMe = groq`*[_type == "about" && defined(slug.current)][0]{
    _id, title, slug, text,
    "darkImageUrl": darkImage.asset->url,
    "lightImageUrl": lightImage.asset->url
    
}`;
