import Document, { Html, Head, Main, NextScript } from "next/document";
import PrismicScript from "../components/prismic";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <html lang="en" />
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" type="image/png" />
        </Head>
        <body className="">
          <Main />
          <NextScript />
          <PrismicScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
