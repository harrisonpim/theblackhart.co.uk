import Link from "next/link";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import DefaultLayout from "../layouts/default";
import { Client } from "../utils/prismic-helpers";

const Social = ({ data }) => {
  const title = RichText.asText(data.title);
  const description = RichText.asText(data.description);

  return (
    <DefaultLayout parentHref="/" parentText="Home" includeFooter={false}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div>{RichText.asText(data.description)}</div>
      <div className="pt-4 text-center">
        {data.body.map((link) => (
          <h1 className="align-middle py-6">
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

export default Social;
