import { groq } from "next-sanity";
export const contactForm = groq`*[_type == "contactForm" && defined(slug.current)]{
    _id, title, slug, text,
    
}`;
