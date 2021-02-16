import DefaultLayout from "../layouts/default";
import Head from "next/head";

export default function Success() {
  return (
    <div>
      <Head>
        <title>Success!</title>
        <meta name="Description" content="Thanks for your order!" />
      </Head>
      <DefaultLayout parentHref="/" parentText="Home">
        <p>
          Thanks for your order! We'll be in touch with a confirmation soon.
        </p>
      </DefaultLayout>
    </div>
  );
}
