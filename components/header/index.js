import Link from "next/link";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="pt-2 pb-3 lg:py-4 ">
      <Link href="/">
        <a>
          <img
            src="/icons/the_black_hart.png"
            alt="The Black Hart"
            className="h-12 mx-auto"
          />
        </a>
      </Link>
      <Nav className="mx-auto text-xs" />
    </header>
  );
}
