import { FC } from "react";
import { cachedClient } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/queries/downloads";
import { IProducts } from "@/types/products";
import ProductCard from "@/components/products/ProductCard";
import _ from "lodash";
import { StraightLine } from "@/components/StraightLine";
import { cn } from "@/lib/utils";
import { orderByReleaseDate } from "@/utils/sanity";
import { AosInit } from "@/components/AOS";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juha Mikael Music | Downloads",
  description: "Juha Mikael Free Downloads",
};

const DownloadPage = async () => {
  const musicProducts = await cachedClient(productsQuery, { type: "music" });
  const remakeProducts = await cachedClient(productsQuery, { type: "remake" });

  const sortedMusicProducts = musicProducts.sort(orderByReleaseDate);
  const sortedRemakeProducts = remakeProducts.sort(orderByReleaseDate);
  return (
    <AosInit>
      <div className="my-10">
        <h1 className="my-10 text-3xl font-bold">Music</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {sortedMusicProducts.map((product: IProducts, index: number) => (
            <ProductCard index={index} key={product._id} product={product} />
          ))}
        </div>
      </div>
      <StraightLine className={cn("border-card-foreground/10")} />
      <div className="my-10">
        <h1 className="my-10 text-3xl font-bold">Remakes</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedRemakeProducts.map((product: IProducts, index: number) => (
            <ProductCard index={index} key={product._id} product={product} />
          ))}
        </div>
      </div>
    </AosInit>
  );
};

export default DownloadPage;
