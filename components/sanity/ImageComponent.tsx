import { FC } from "react";
import type { ImageComponent } from "@/types/sanity";
import urlBuilder from "@sanity/image-url";
import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { client } from "@/sanity/lib/client";
import CustomDialog from "@/components/dialog/CustomDiaglog";
import { StraightLine } from "@/components/StraightLine";

const BlockImageComponent: FC<ImageComponent> = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <>
      <div className="flex justify-center">
        <Image
          className="my-3 p- rounded-xl"
          src={urlBuilder(client).image(value).fit("max").auto("format").url()}
          width={width / 1.5}
          height={height / 1.5}
          alt={value.alt || " "}
          loading="lazy"
          style={{
            display: isInline ? "inline-block" : "block",
          }}
        />
      </div>

      <CustomDialog>
        <Image
          className=""
          src={urlBuilder(client)
            .image(value)
            .fit("scale")
            .auto("format")
            .url()}
          width={width}
          height={height}
          alt={value.alt || " "}
          loading="lazy"
          style={{
            display: isInline ? "inline-block" : "block",
          }}
        />
      </CustomDialog>
      <StraightLine />
    </>
  );
};

export default BlockImageComponent;
