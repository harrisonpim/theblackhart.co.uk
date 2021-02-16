import Social from "../social";
import FooterBreak from "./footerBreak";

export default function Footer() {
  const this_year = new Date().getFullYear();
  return (
    <footer className="absolute bottom-0 w-full">
      <FooterBreak />
      <div className="grid grid-cols-1 lg:grid-cols-2 row-gap-2 pt-2 lg:pt-0">
        <div className="flex gap-2 mx-auto lg:mx-0 lg:text-left">
          <a href="/faq">FAQs</a>
          <a href="/legal">Legal</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="mx-auto lg:mx-0 lg:text-right">
          Copyright © The Black Hart {this_year}
        </div>{" "}
      </div>
      <Social />
    </footer>
  );
}
