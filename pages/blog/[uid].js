import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../utils/queries";
import Layout from "../../layouts/default";
import SliceZone from "../../components/slicezone";
import { Client } from "../../prismic.config";
import { formatDate } from "../../components/date";

export default function Post({ post }) {
  if (post && post.data) {
    const date = formatDate(post.data.date);
    const title = RichText.asText(post.data.title);

    return (
      <Layout title={title}>
        <div className="">
          <div className="mx-auto w-full pt-3">
            <h1 className="thornletter -mb-2">{title}</h1>
            <div className="text-sm text-silver pb-4">{date}</div>
          </div>
          <SliceZone sliceZone={post.data.body1} />
        </div>
      </Layout>
    );
  }

  return null;
}

export async function getStaticProps({
  params,
  preview = null,
  previewData = {},
}) {
  const { ref } = previewData;
  const post =
    (await Client().getByUID("blog-post", params.uid, ref ? { ref } : null)) ||
    {};
  return {
    props: {
      preview,
      post,
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "blog-post"
  );
  return {
    paths: documents.map((doc) => `/blog/${doc.uid}`),
    fallback: false,
  };
}
