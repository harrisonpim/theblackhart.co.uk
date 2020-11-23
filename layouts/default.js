import Header from "../components/header";
import Footer from "../components/footer";

export default function DefaultLayout({
  children,
  parentText,
  parentHref,
  includeFooter = true,
}) {
  return (
    <div className="container min-h-screen lg:w-3/4 xl:w-7/12 px-8 lg:px-0 mx-auto relative">
      <Header parentHref={parentHref} parentText={parentText} />
      <main className="pb-32 lg:pb-12 prose">{children}</main>
      {includeFooter ? <Footer /> : null}
    </div>
  );
}
