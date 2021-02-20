import Head from "next/head";
import SliceZone from "../components/landing";
import { Client } from "../utils/prismic";
import { RichText } from "prismic-reactjs";

const Index = ({ index }) => {
  if (index && index.data) {
    return (
      <div>
        <Head>
          <title>{RichText.asText(index.data.title)}</title>
          <meta
            name="description"
            content={RichText.asText(index.data.description)}
          />
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
