export default function Nav(props) {
  return (
    <div {...props}>
      <div className="flex space-x-4 justify-center">
        <a className="capitalize no-underline text-sm" href="/shop">
          Shop
        </a>
        <a className="capitalize no-underline text-sm" href="/commissions">
          Commissions
        </a>
        <a className="capitalize no-underline text-sm" href="/blog">
          Blog
        </a>
        <a className="capitalize no-underline text-sm" href="/faq">
          FAQ
        </a>
      </div>
    </div>
  );
}
