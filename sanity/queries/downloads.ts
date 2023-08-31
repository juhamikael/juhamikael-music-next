import { groq } from "next-sanity";

export const productsQuery = groq`*[_type == "downloads" && productType[0].value == $type]{
    _id, songTitle, slug, releaseDate, description, href, mainImage,
    mainArtists[]->{name},
    featuredArtists[]->{name},
    remixerArtists[]->{name},
    genreTags[],
    mainImage,
    price,
    musicMetadata,
    "productType": productType[0].value,
    "imageUrl": mainImage.asset->url
}`;
