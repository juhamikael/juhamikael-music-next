import { groq } from "next-sanity";

export const releasesQuery = groq`*[_type == "releases" && defined(slug.current)]{
    _id, songTitle, slug, releaseDate, description, href, mainImage, genreTags[],
    mainArtists[]->{name},
    featuredArtists[]->{name},
    remixerArtists[]->{name},
    mainImage,
    price,
    "imageUrl": mainImage.asset->url
}`;

export const getSingleRelease = groq`*[_type == "releases" && slug.current == $slug][0]{
    _id, songTitle, slug, releaseDate, description, href, mainImage, genreTags[],
    mainArtists[]->{name},
    featuredArtists[]->{name},
    remixerArtists[]->{name},
    mainImage,
    price,
    "imageUrl": mainImage.asset->url
}`;

export const getMultipleReleases = groq`*[_type == "releases" && slug.current in $slugs]{
    _id, songTitle, slug, releaseDate, description, href, mainImage, genreTags[],
    mainArtists[]->{name},
    featuredArtists[]->{name},
    remixerArtists[]->{name},
    mainImage,
    price,
    "imageUrl": mainImage.asset->url
}`;
