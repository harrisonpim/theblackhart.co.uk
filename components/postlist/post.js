import React from "react";
import { default as NextLink } from "next/link";
import { RichText } from "prismic-reactjs";

import Lead from "./lead";
import { linkResolver } from "../../prismic-configuration";

export default function Post({ post }) {
  const title = RichText.asText(post.data.title)
    ? RichText.asText(post.data.title)
    : "Untitled";

  return (
    <div>
      <NextLink as={linkResolver(post)} href={linkResolver(post)}>
        <a className="no-underline">
          <h2>{title}</h2>
        </a>
      </NextLink>
      <Lead sliceZone={post.data.body1} textLimit={300} />
    </div>
  );
}
