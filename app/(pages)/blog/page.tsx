import { Metadata } from "next";
import { getPosts } from "@/sanity/queries/blog";
import { cachedClient } from "@/sanity/lib/client";
import zoom from "@/app/styles/zoom.module.css";
import {
  Card,
  CardContent,
  CardDescriptionBlog as CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsFillCircleFill } from "react-icons/bs";

import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { StraightLine } from "@/components/StraightLine";
import type { IPost } from "@/types/blog";
import { orderByDate, parseDate } from "@/lib/time";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Juha Mikael Music | Blog",
  description: "Juha Mikael Blog",
};

const BlogPage = async ({}) => {
  const posts = (await cachedClient(getPosts)) as IPost[];
  const data = orderByDate(posts.map((item) => item));
  return (
    <>
      {(data as IPost[]).map((item: IPost) => (
        <>
          <Card
            className={`mt-10 border-none rounded-2xl mx-auto bg-transparent ${zoom.zoom} group  `}
            key={item._id + 1}
          >
            <Link href={`/blog/${item.slug.current}`}>
              <CardHeader>
                <CardTitle
                  className={cn("group-hover:text-primary transition-colors")}
                >
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs flex gap-x-2 items-center">
                  <BsFillCircleFill className="text-primary" />
                  <span className={cn("truncate")}>
                    {item.blogTags?.map((tag) => tag.label).join(", ") ??
                      "No Tags"}
                  </span>
                </CardDescription>
                <CardDescription
                  className={cn("flex flex-col md:lg:xl:2xl:flex-row gap-x-5")}
                >
                  <div className="text-xs">
                    <span className="font-bold">Published:</span>{" "}
                    {item.publishedAt
                      ? parseDate(item.publishedAt).prettifyDate
                      : "Date not available"}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-p:text-sm prose-p:text-card-foreground">
                {item.description && <PortableText value={item.description} />}
                <p className="italic group-hover:text-primary transition-colors">
                  Click to read more
                </p>
              </CardContent>
            </Link>
          </Card>
          <StraightLine className="mt-10 mb-10 border-card-foreground/10  " />
        </>
      ))}
    </>
  );
};

export default BlogPage;
