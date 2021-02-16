import Link from "next/link";
import { RichText } from "prismic-reactjs";
import Lead from "./lead";
import { linkResolver } from "../../prismic-configuration";
import { formatDate } from "../date";

export default function Post({ post }) {
  const title = RichText.asText(post.data.title)
    ? RichText.asText(post.data.title)
    : "Untitled";
  const date = formatDate(post.data.date);
  return (
    <div>
      <Link as={linkResolver(post)} href={linkResolver(post)}>
        <a className="no-underline pb-none">
          <h2 className="pb-none">{title}</h2>
        </a>
      </Link>
      <div className="text-sm text-silver pb-3">{date}</div>
      <Lead sliceZone={post.data.body1} textLimit={300} />
    </div>
  );
}
