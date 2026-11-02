import React from "react";
import { useContent } from "../content";

export default function ProductVisual({ product, detail = false }) {
  const { c, pick } = useContent();
  const media =
    detail && product.image.detail ? product.image.detail : product.image;
  return (
    <figure
      className={`product-visual${detail ? " product-visual--detail" : ""}${product.image.actual ? " product-visual--actual" : ""}`}
    >
      <img
        src={`${import.meta.env.BASE_URL}${pick(media.src)}`}
        alt={pick(media.alt)}
        width={media.width || 1536}
        height={media.height || 1024}
        style={{
          aspectRatio: `${media.width || 1536} / ${media.height || 1024}`,
        }}
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        {product.image.caption ? pick(product.image.caption) : c.detail.artwork}
      </figcaption>
    </figure>
  );
}
