"use client";

import { IProducts } from "@/types/products";
import { formatSongName, getDimensionFromUrl } from "@/utils/sanity";
import _ from "lodash";

import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import zoom from "@/app/styles/zoom.module.css";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import Player from "@/components/player";
import { matchPlatformAndGetId, parsePlatform } from "@/utils/player";

const ProductCard: FC<{ product: IProducts; index: number }> = ({
  product,
  index,
}) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const fullTitle = formatSongName(
    product.mainArtists,
    product.remixerArtists,
    product.featuredArtists,
    product.songTitle
  );
  const { height, width } = getDimensionFromUrl(product.imageUrl);
  const productName = `${fullTitle.artist} - ${fullTitle.songTitle}`;

  const platform = parsePlatform(product.href.preview);

  const watchFrom = (platform: string) => {
    switch (platform) {
      case "spotify":
        return "Listen on Spotify";
      case "soundcloud":
        return "Listen on Soundcloud";
      case "youtube":
        return "Watch on Youtube";
      default:
        return "Preview";
    }
  };

  const onClickHandler = () => {
    setShowPlayer(!showPlayer);
  };

  return (
    <Dialog>
      <DialogTrigger className={zoom.zoom} onClick={() => setShowPlayer(false)}>
        <Card
          data-aos="fade-up"
          data-aos-delay={((index % 3) + 1) * 50}
          data-aos-duration={((index % 3) + 1) * 700}
          data-aos-once="false"
          className={cn("bg-transparent gap-3 group ")}
        >
          <CardHeader className={cn("px-0 pt-0")}>
            <Image
              className="rounded-t-xl w-full"
              src={product.imageUrl}
              alt={fullTitle.songTitle}
              width={width}
              height={height}
            />
          </CardHeader>
          <CardContent className="">
            <CardDescription className={cn("text-sm font-bold truncate")}>
              {fullTitle.artist}
            </CardDescription>
            <CardDescription
              className={cn("max-h-24 overflow-y-auto text-xs truncate")}
            >
              {fullTitle.songTitle}
            </CardDescription>
          </CardContent>
          <CardFooter className={cn("flex justify-center")}>
            <CardDescription
              className={cn("group-hover:text-primary transition-colors")}
            >
              {product.price === 0
                ? "Download for free"
                : `Buy for ${product.price} €`}
            </CardDescription>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "p-10 border rounded-xl border-primary/20 h-fit dark:bg-[#0f0f0f]/90"
        )}
      >
        <DialogHeader className="h-fit">
          <DialogTitle
            className={cn("text-card-foreground text-md text-center my-4 ")}
          >
            {productName}
          </DialogTitle>
          <DialogDescription
            className={cn("flex gap-x-4 justify-center just pt-6 pb-4")}
          >
            <Button className={cn("w-52")} onClick={onClickHandler}>
              {watchFrom(platform || "")}
            </Button>

            <Link href={product.href.lemonsqueezeHref || ""} target="_blank">
              <Button className={cn("w-52")}>
                {product.price > 0
                  ? `Buy for ${product.price} €`
                  : "Free Download"}
              </Button>
            </Link>
          </DialogDescription>
          <DialogTitle
            className={cn("text-card-foreground text-md flex justify-center")}
          >
            Category: {_.capitalize(product.productType)}
          </DialogTitle>
        </DialogHeader>
        {showPlayer && (
          <div className="flex justify-center">
            <Player
              platform={
                matchPlatformAndGetId(product.href.preview)?.platform || ""
              }
              embed={matchPlatformAndGetId(product.href.preview)?.embed || ""}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductCard;
