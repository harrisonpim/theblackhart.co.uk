import Header from "../components/header";
import Footer from "../components/footer";

export default function DefaultLayout({
  children,
  includeFooter = true,
  includeHeader = true,
}) {
  return (
    <div className="lg:w-3/4 xl:w-7/12 px-8 lg:px-0 mx-auto">
      <div className="min-h-screen relative">
        {includeHeader ? <Header /> : null}
        <main className="pb-40 lg:pb-32">{children}</main>
        {includeFooter ? <Footer /> : null}
      </div>
    </div>
  );
}
