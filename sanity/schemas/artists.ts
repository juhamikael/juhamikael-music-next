import { defineField, defineType } from "sanity";

export default defineType({
  name: "artists",
  title: "Artists",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
