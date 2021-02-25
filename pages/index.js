import Head from "next/head";
import SliceZone from "@/components/landing";
import { Client } from "../prismic.config";
import { RichText } from "prismic-reactjs";
import Footer from "@/components/footer";

export default function Index({ index }) {
  return (
    <div>
      <Head>
        <title>{RichText.asText(index.data.title)}</title>
        <meta
          name="description"
          content={RichText.asText(index.data.description)}
        />
      </Head>
      <div className="pb-40 lg:pb-32">
        <SliceZone sliceZone={index.data.body} />
      </div>
      <div className="lg:w-3/4 xl:w-7/12 px-5 lg:px-0 mx-auto">
        <div className="relative">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const index = await Client().getSingle("index");
  return {
    props: {
      index,
    },
  };
}
