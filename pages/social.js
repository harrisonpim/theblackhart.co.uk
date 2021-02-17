import Link from "next/link";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import DefaultLayout from "../layouts/default";
import { Client } from "../utils/prismic-helpers";
import Social from "../components/social";

const Linktree = ({ data }) => {
  const title = RichText.asText(data.title);
  const description = RichText.asText(data.description);

  return (
    <DefaultLayout includeFooter={false}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="text-center thornletter">
        {data.body.map((link) => (
          <h1 className="align-middle py-6 text-6xl">
            <Link href={link.primary.url.url}>
              <a className="no-underline">{link.primary.text[0].text}</a>
            </Link>
          </h1>
        ))}
      </div>
    </DefaultLayout>
  );
};

export async function getStaticProps() {
  const response = await Client().getSingle("linktree");
  const data = response.data;

  return {
    props: {
      data,
    },
  };
}

export default Linktree;
