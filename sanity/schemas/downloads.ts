import { defineField, defineType } from "sanity";
import { predefinedGenres } from "@/sanity/lib/predefinedGenres";
export default defineType({
  name: "downloads",
  title: "Downloads",
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
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
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
      name: "productType",
      title: "Product Type",
      type: "tags",
      options: {
        predefinedTags: [
          { label: "Remake", value: "remake" },
          { label: "Music", value: "music" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Music Metadata",
      name: "musicMetadata",
      type: "object",
      fields: [
        {
          title: "BPM",
          name: "bpm",
          type: "number",
        },
        {
          title: "Key",
          name: "key",
          type: "string",
        },
        {
          title: "Format",
          name: "format",
          type: "tags",
          options: {
            predefinedTags: [
              { label: "MP3", value: "mp3" },
              { label: "WAV", value: "wav" },
            ],
          },
        },
      ],
    }),
    defineField({
      title: "Genre",
      name: "genreTags",
      type: "tags",
      options: {
        predefinedTags: predefinedGenres,
      },
    }),
    defineField({
      title: "Href",
      name: "href",
      type: "object",
      fields: [
        {
          title: "Preview",
          description: "Stream link of the release",
          name: "preview",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Lemonsqueeze Href",
          description: "Download link for the release",
          name: "lemonsqueezeHref",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
});
