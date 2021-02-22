import Link from "next/link";
import { RichText } from "prismic-reactjs";
import Lead from "./lead";
import { linkResolver } from "../../prismic.config";
import { formatDate } from "../date";

export default function Post({ post }) {
  const title = RichText.asText(post.data.title)
    ? RichText.asText(post.data.title)
    : "Untitled";
  const date = formatDate(post.data.date);
  return (
    <div>
      <Link as={linkResolver(post)} href={linkResolver(post)}>
        <a className="no-underline">
          <h2>{title}</h2>
        </a>
      </Link>
      <div className="text-sm">
        <div className="text-silver">{date}</div>
        <Lead sliceZone={post.data.body1} textLimit={300} />
      </div>
    </div>
  );
}
