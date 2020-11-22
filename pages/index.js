import Head from "next/head";
import SliceZone from "../components/landing";
import { Client } from "../utils/prismic-helpers";
import { RichText } from "prismic-reactjs";

const Index = ({ index }) => {
  if (index && index.data) {
    const title = RichText.asText(index.data.title);
    const description = RichText.asText(index.data.description);

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name="Description" content={description} />
        </Head>

        <SliceZone sliceZone={index.data.body} />
      </div>
    );
  }
  return null;
};

export async function getStaticProps() {
  const index = (await Client().getSingle("index")) || {};
  return {
    props: {
      index,
    },
  };
}

export default Index;
