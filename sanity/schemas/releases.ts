import { defineField, defineType } from "sanity";
import { predefinedGenres } from "../lib/predefinedGenres";
export default defineType({
  name: "releases",
  title: "Releases",
  type: "document",
  fields: [
    defineField({
      title: "Main Artists",
      description: "Main artists of the release",
      name: "mainArtists",
      type: "array" || "string",
      of: [{ type: "reference", to: { type: "artists" } }],
    }),
    defineField({
      title: "Featured Artists",
      description: "If song have singer, fill this field",
      name: "featuredArtists",
      type: "array" || "string",
      of: [{ type: "reference", to: { type: "artists" } }],
    }),
    defineField({
      title: "Remixer Artists",
      description: "If song is remix, fill this field",
      name: "remixerArtists",
      type: "array",
      of: [{ type: "reference", to: { type: "artists" } }],
    }),
    defineField({
      name: "songTitle",
      title: "Song Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "songTitle",
        maxLength: 96,
      },
    }),

    defineField({
      name: "releaseDate",
      title: "Release Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      title: "Href",
      name: "href",
      type: "object",
      fields: [
        {
          title: "Stream",
          description: "Stream link of the release",
          name: "stream",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Download",
          description: "Download link of the release",
          name: "download",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "genreTags",
      title: "Genre Tags",
      type: "tags",
      options: {
        includeFromRelated: "genreTags",
        predefinedTags: predefinedGenres,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
