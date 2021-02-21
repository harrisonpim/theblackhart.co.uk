export default function Nav(props) {
  return (
    <div {...props}>
      <ul className="flex space-x-4 justify-center uppercase">
        <li key="shop">
          <a className="no-underline" href="/shop">
            Shop
          </a>
        </li>
        <li key="commissions">
          <a className="no-underline" href="/bespoke">
            Commissions
          </a>
        </li>
        <li key="blog">
          <a className="no-underline" href="/blog">
            Blog
          </a>
        </li>
        <li key="faq">
          <a className="no-underline" href="/faq">
            FAQ
          </a>
        </li>
      </ul>
    </div>
  );
}
