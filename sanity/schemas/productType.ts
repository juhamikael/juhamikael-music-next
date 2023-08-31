import { defineField, defineType } from "sanity";

export default defineType({
  name: "productType",
  title: "Product Type",
  type: "document",
  fields: [
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "productType",
    },
  },
});
