"use client";

import { FC, useState } from "react";

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IProducts } from "@/types/products";
import { formatSongName, getDimensionFromUrl } from "@/utils/sanity";
import _ from "lodash";
import { Card } from "../ui/card";
type DialogProps = {
  prop?: string;
  children?: React.ReactNode;
  musicProducts: IProducts[];
  remakeProducts: IProducts[];
};

const parsePlatform = (url: string) => {
  if (url.includes("spotify")) {
    return "spotify";
  }
  if (url.includes("soundcloud")) {
    return "soundcloud";
  }
  if (url.includes("youtube")) {
    return "youtube";
  }
};

const CustomDialog: FC<DialogProps> = ({
  children,
  musicProducts,
  remakeProducts,
}) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const onClickHandler = () => {
    setShowPlayer(!showPlayer);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="grid grid-cols-3 gap-8">
          {musicProducts.map((product: IProducts) => {
            const fullTitle = formatSongName(
              product.mainArtists,
              product.remixerArtists,
              product.featuredArtists,
              product.songTitle
            );
            const { height, width } = getDimensionFromUrl(product.imageUrl);

            const productName = `${fullTitle.artist} - ${fullTitle.songTitle}`;
            const platform = parsePlatform(product.href.preview);
            if (!product) {
              return null;
            }
            return (
              <Card key={product._id}>
                <Image
                  className="rounded-t-xl"
                  src={product.imageUrl}
                  alt={fullTitle.songTitle}
                  width={width}
                  height={height}
                />
              </Card>
            );
          })}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>Dialog description</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
