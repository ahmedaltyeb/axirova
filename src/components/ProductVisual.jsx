import React from "react";
import { useContent } from "../content";

export default function ProductVisual({ product, detail = false }) {
  const { c, pick } = useContent();
  return (
    <figure
      className={`product-visual${detail ? " product-visual--detail" : ""}`}
    >
      <img
        src={`${import.meta.env.BASE_URL}${product.image.src}`}
        alt={pick(product.image.alt)}
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
      />
      <figcaption>{c.detail.artwork}</figcaption>
    </figure>
  );
}
