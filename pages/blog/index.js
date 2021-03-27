import { Client, linkResolver } from "../../prismic.config";

import Layout from "@components/layouts/default";
import Lead from "@components/lead";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import { formatDate } from "@components/date";
import { queryRepeatableDocuments } from "@lib/queries";

export default function Blog({ index, posts }) {
  return (
    <Layout
      title={RichText.asText(index.data.title)}
      description={RichText.asText(index.data.description)}
    >
      <ul aria-label="posts">
        {posts.map((post) => (
          <li className="pb-3">
            <Link as={linkResolver(post)} href={linkResolver(post)}>
              <a className="no-underline">
                <h2>{RichText.asText(post.data.title)}</h2>
              </a>
            </Link>
            <div>
              <div className="text-silver">{formatDate(post.data.date)}</div>
              <Lead sliceZone={post.data.body1} textLimit={300} />
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const index = await Client().getSingle("blog-home");
  const posts = await queryRepeatableDocuments(
    (doc) => doc.type === "blog-post"
  );

  return {
    props: {
      index,
      posts: posts,
    },
  };
}
