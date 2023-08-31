import { cn } from "@/lib/utils";

const proseValues = {
  h1: "prose-h1:text-card-foreground prose-h1:mt-6 prose-h1:font-display prose-h1:text-3xl prose-h1:font-semibold prose-h1:lg:text-8xl prose-h1:my-2 prose-h1:ml-12",
  h2: "prose-h2:text-card-foreground prose-h2:mt-6 prose-h2:font-display prose-h2:text-2xl prose-h2:font-semibold prose-h2:lg:text-4xl prose-h2:my-2 prose-h2:ml-12",
  h3: "prose-h3:text-card-foreground prose-h3:mt-6 prose-h3:font-display prose-h3:text-xl prose-h3:pt-6 prose-h3:font-semibold prose-h3:lg:text-2xl prose-h3:my-2 prose-h3:ml-12",
  p: "prose-p:text-card-foreground prose-p:text-sm prose-p:my-2 prose-p:ml-12 prose-p:lg:text-base",
  a: "prose-a:font-bold prose-a:text-primary prose-a:text-sm prose-a:my-2 prose-a:lg:text-base",
  li: "prose-li:text-card-foreground/60 prose-li:mt-5 prose-li:space-y-2 prose-li:list-disc prose-li:lg:ml-10 prose-li:text-base prose-li:my-2",
  bold: "prose-strong:text-card-foreground prose-strong:text-card-foreground/70",
};

const proseBlogValues = {
  a: "prose-a:text-primary",
  strong: "prose-strong:font-bold prose-strong:text-card-foreground",
  h1: "prose-h1:text-4xl prose-h1:font-bold prose-h1:font-extrabold prose-h1:my-4 prose-h1:text-card-foreground",
  h2: "prose-h2:text-3xl prose-h2:font-bold prose-h2:font-extrabold prose-h2:my-4 prose-h2:text-card-foreground",
  h3: "prose-h3:text-2xl prose-h3:font-boldprose-h3:font-bold prose-h3:mt-10 prose-h3:text-card-foreground",
  h4: "prose-h4:text-xl prose-h4:font-bold prose-h4:font-bold prose-h4:my-2 prose-h4:text-card-foreground",
  p: "prose-p:text-base prose-p:text-card-foreground prose-p:mt-1 prose-p:min-w-fit prose-p:max-w-fit ",
  li: "prose-li:list-disc prose-li:text-base prose-li:mx-1 prose-li:my-2.5 prose-li:text-card-foreground",
  ol: "prose-ol:list-disc prose-ol:text-base prose-ol:mx-1 prose-ol:my-2.5 prose-ol:text-card-foreground",
  blockquote:
    "prose-blockquote:font-serif prose-blockquote:text-xs prose-blockquote:text-base prose-blockquote:my-4 dark:prose-blockquote:text-card-foreground/30",
};

export const prose = cn(...Object.values(proseValues));
export const proseBlog = cn(...Object.values(proseBlogValues));
