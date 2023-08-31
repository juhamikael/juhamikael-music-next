/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schema } from "@/sanity/schema";

// Custom plugins
import { tags } from "sanity-plugin-tags";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool(),

    visionTool({ defaultApiVersion: apiVersion }),

    // Custom plugins
    tags({}),
    vercelDeployTool(),
  ],
});
