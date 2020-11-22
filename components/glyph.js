import React from "react";

export default function Glyph({ slice }) {
  return (
    <figure className="mx-auto w-24">
      <img src={slice.primary.image.url} alt={slice.primary.image.alt} />
    </figure>
  );
}
