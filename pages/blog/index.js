import { RichText } from "prismic-reactjs";
import Layout from "../../layouts/default";
import PostList from "../../components/postlist";
import { queryRepeatableDocuments } from "../../utils/queries";
import { Client } from "../../utils/prismic";

const Blog = ({ index, posts }) => {
  return (
    <Layout
      title={RichText.asText(index.data.title)}
      description={RichText.asText(index.data.description)}
    >
      <div className="pt-4">
        <PostList posts={posts} />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const client = Client();
  const index = await client.getSingle("blog-home");
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

export default Blog;
