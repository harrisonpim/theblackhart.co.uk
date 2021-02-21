import Header from "../header";
import Footer from "../footer";
import Head from "next/head";

export default function Layout({
  children,
  includeFooter = true,
  includeHeader = true,
  title = "The Black Hart",
  description = null,
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
      </Head>
      <div className="lg:w-3/4 xl:w-7/12 px-8 lg:px-0 mx-auto">
        <div className="min-h-screen relative">
          {includeHeader ? <Header /> : null}
          <main className="pb-40 lg:pb-32">{children}</main>
          {includeFooter ? <Footer /> : null}
        </div>
      </div>
    </div>
  );
}
