import { FC } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescriptionBlog as CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { getPost, getPosts } from "@/sanity/queries/blog";
import { cachedClient } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { proseBlog } from "@/app/styles/prose";
import { BsFillCircleFill } from "react-icons/bs";
import { BiSolidChevronsLeft } from "react-icons/bi";
import { StraightLine } from "@/components/StraightLine";
import { FaPencilAlt } from "react-icons/fa";
import type { IPost } from "@/types/blog";
import BlockImageComponent from "@/components/sanity/ImageComponent";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Metadata } from "next";
import { getDimensionFromUrl } from "@/utils/sanity";
import { orderByDate, parseDate } from "@/lib/time";
// import { parseDate } from "@/lib/time";
import Image from "next/image";
const components = {
  types: {
    image: BlockImageComponent,
  },
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let slug: string = params.slug;
  let post = (await cachedClient(getPost, { slug: slug })) as IPost;

  try {
    const BlogDescription = post.description[0].children.map(
      (child) => child.text
    );
    return {
      title: `Juha Mikael Music | Blog | ${post.title}`,
      description: BlogDescription[0],
    };
  } catch (error) {
    console.error(error);
    return {
      title: `JM | Blog | NaN`,
      description: `NaN`,
    };
  }
}

const BlogPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = (await cachedClient(getPost, { slug: slug })) as IPost;

  const allPosts = (await cachedClient(getPosts)) as IPost[];
  const filteredPosts = allPosts.filter((item) => item.slug.current !== slug);

  const allPostOrdered = orderByDate(filteredPosts.map((item) => item));
  console.log();
  return (
    <div className="md:flex md:justify-center">
      <Card className="bg-transparent border border-transparent shadow-none  md:w-2/3 ">
        <CardHeader className="py-0 mt-2">
          {post.imageUrl && (
            <Image
              className="w-full h-60 object-cover rounded-2xl "
              src={post.imageUrl}
              width={getDimensionFromUrl(post.imageUrl).width}
              height={getDimensionFromUrl(post.imageUrl).height}
              alt={post.mainImage.alt}
            />
          )}
          <CardTitle className="text-3xl md:text-3xl font-black">
            {post.title}
          </CardTitle>
          <CardDescription className="text-xs flex flex-col ">
            <span className="font-bold mt-1 flex gap-x-2 items-center">
              <FaPencilAlt className="inline-block" />
              <span>{"Published:"}</span>
              <span>
                {post.publishedAt
                  ? parseDate(post.publishedAt).prettifyDate
                  : "Date not available"}
              </span>
            </span>
            <StraightLine className="border-card-foreground/10 mt-4 flex" />
          </CardDescription>
          <CardDescription className="text-xs gap-2 items-center flex flex-wrap">
            {post.blogTags?.map((tag) => (
              <Badge
                key={tag.label}
                className="mr-2 w-fit flex items-center gap-x-2 p-2 rounded-2xl"
              >
                <BsFillCircleFill className="text-card-foreground" />
                {tag.label}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent className={cn("prose", proseBlog)}>
          <PortableText value={post.body} components={components} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <div className="lg:border-l lg:h-fit px-6 ">
        {allPostOrdered.length === 0 ? (
          <Link
            href="/blog"
            target="_self"
            className="mt-4 font-bold flex items-center gap-x-4 text-primary hover:text-primary/80"
          >
            <BiSolidChevronsLeft />
            <span>Go Back</span>
          </Link>
        ) : (
          <>
            <CardTitle
              className={cn("ml-2 text-base gap-2 items-center flex flex-wrap")}
            >
              Other posts:
            </CardTitle>

            <ul>
              {allPostOrdered.map((item) => (
                <li key={item._id}>
                  <Link href={`/blog/${item.slug.current}`}>
                    <CardDescription
                      className={cn(
                        "py-0 ml-2 flex flex-col hover:text-primary transition-colors"
                      )}
                    >
                      - {item.title} ({parseDate(item.publishedAt).prettifyDate}
                      )
                    </CardDescription>
                  </Link>
                </li>
              ))}
              <Link
                href="/blog"
                target="_self"
                className="mt-4 font-bold flex items-center gap-x-4 text-primary hover:text-primary/80"
              >
                <BiSolidChevronsLeft />
                <span>Back to Posts</span>
              </Link>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
