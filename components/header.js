import Link from "next/link";

export default function Header({ parentHref, parentText }) {
  return (
    <header className="pt-8 pb-4">
      <Link
        href="/"
        className="inline-block align-middle mr-4 no-underline h-16"
      >
        <a>
          <img
            src="/assets/tbh_white.png"
            alt="TBH"
            className="inline-block h-12 pr-4"
          />
        </a>
      </Link>

      <Link href={parentHref}>
        <a className="no-underline inline-block text-xl align-middle">
          {parentText}
        </a>
      </Link>
    </header>
  );
}
