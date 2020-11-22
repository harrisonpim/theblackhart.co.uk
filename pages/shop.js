import Head from "next/head";
import { Client } from "../utils/prismic-helpers";
import { RichText } from "prismic-reactjs";
import Header from "../components/landing/header";

const Index = ({ index }) => {
  const title = RichText.asText(index.data.title);
  const description = RichText.asText(index.data.description);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="Description" content={description} />
      </Head>
      <Header slice={index.data} />
    </div>
  );
};

export async function getStaticProps() {
  const client = Client();
  const index = await client.getSingle("shop");
  return {
    props: {
      index,
    },
  };
}

export default Index;
