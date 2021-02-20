import Link from "next/link";
import { linkResolver } from "../../prismic.config";

export default function Nav(props) {
  return (
    <div {...props}>
      <div className="flex space-x-4 justify-center">
        <a className="uppercase no-underline" href="/shop">
          Shop
        </a>
        <a className="uppercase no-underline" href="/bespoke">
          Commissions
        </a>
        <a className="uppercase no-underline" href="/blog">
          Blog
        </a>
        <a className="uppercase no-underline" href="/faq">
          FAQ
        </a>
        <a className="uppercase no-underline" href="/shop/basket">
          Basket
        </a>
      </div>
    </div>
  );
}
