export default function Footer() {
  const this_year = new Date().getFullYear();
  return (
    <footer className="lg:w-full absolute bottom-0 h-32 lg:h-12 pt-4 lg:pt-2 table">
      <a
        href="https://www.instagram.com/tbh_jewellery/"
        className="no-underline pr-2 lg:inline-block hover:text-white"
      >
        Instagram
      </a>
      <a
        href="https://www.youtube.com/channel/UCfUqXisYyNzQcRDPxP_SizQ"
        className="no-underline pr-2 lg:inline-block hover:text-white"
      >
        YouTube
      </a>
      <a
        href="https://www.twitter.com/tbh_jewellery/"
        className="no-underline pr-2 lg:inline-block hover:text-white"
      >
        Twitter
      </a>
      <a
        href="mailto:hello@theblackhart.co.uk"
        className="no-underline pr-2 lg:inline-block hover:text-white block pt-2 lg:pt-0"
      >
        hello@theblackhart.co.uk
      </a>
      <div className="pb-0 float-left block pt-2 lg:float-right lg:inline-block lg:pt-0">
        © {this_year} The Black Hart
      </div>
    </footer>
  );
}
