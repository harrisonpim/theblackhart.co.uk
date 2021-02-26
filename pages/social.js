import Link from "next/link";
import { RichText } from "prismic-reactjs";
import Layout from "@/components/layouts/default";
import { Client } from "../prismic.config";

const Linktree = ({ data }) => {
  const title = RichText.asText(data.title);
  const description = RichText.asText(data.description);

  return (
    <Layout includeFooter={false} title={title} description={description}>
      <div className="text-center thornletter">
        {data.body.map((link) => (
          <div className="align-middle py-6" key={link.primary.text[0].text}>
            <Link href={link.primary.url.url}>
              <a className="no-underline">{link.primary.text[0].text}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
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
