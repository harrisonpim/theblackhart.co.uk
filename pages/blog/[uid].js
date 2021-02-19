import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../utils/queries";
import DefaultLayout from "../../layouts/default";
import SliceZone from "../../components/slicezone";
import { Client } from "../../utils/prismic-helpers";
import { formatDate } from "../../components/date";

const Post = ({ post }) => {
  if (post && post.data) {
    const titleImageURL = post.data["title-image"].url;
    const date = formatDate(post.data.date);
    const title = RichText.asText(post.data.title);

    return (
      <DefaultLayout>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="">
          <div className="mx-auto w-full pt-3">
            <h1 className="thornletter text-6xl -mb-3">{title}</h1>
            <div className="text-sm text-silver pb-4">{date}</div>
          </div>
          <SliceZone sliceZone={post.data.body1} />
        </div>
      </DefaultLayout>
    );
  }

  return null;
};

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

export default Post;
