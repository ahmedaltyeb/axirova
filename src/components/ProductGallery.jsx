import React from "react";
import { useContent } from "../content";

export default function ProductGallery({ item }) {
  const { c, pick } = useContent();
  if (!item.gallery) return null;
  return (
    <div className="product-gallery">
      <h2>{c.detail.gallery}</h2>
      <p>{pick(item.galleryCaption || item.image.caption)}</p>
      <div className="two-grid">
        {item.gallery.map((screen) => (
          <figure key={pick(screen.src)}>
            <a
              href={`${import.meta.env.BASE_URL}${pick(screen.src)}`}
              target="_blank"
              rel="noreferrer"
              aria-label={pick(screen.alt)}
            >
              <img
                src={`${import.meta.env.BASE_URL}${pick(screen.preview || screen.src)}`}
                alt={pick(screen.alt)}
                width={screen.previewWidth || screen.width}
                height={screen.previewHeight || screen.height}
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption>
              {pick(screen.title)} <span aria-hidden="true">↗</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
