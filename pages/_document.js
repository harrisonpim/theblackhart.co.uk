import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/icons/favicon/tbh.svg" type="image/svg+xml" />
          <link rel="icon" href="/icons/favicon/32.ico" type="image/png" />
          <link
            rel="apple-touch-icon"
            href="/icons/favicon/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
