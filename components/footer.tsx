import Social from './social'

export default function Footer() {
  const thisYear = new Date().getFullYear()
  return (
    <footer className="absolute bottom-0 w-full text-sm">
      <div className=" flex items-center">
        <div className="flex-grow border-t border-white" />
        <img src="/icons/tbh.png" className="h-6 px-2" alt="TBH" />
        <div className="flex-grow border-t border-white" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 row-gap-2 pt-1 lg:pt-0">
        <div className="flex gap-5 mx-auto lg:mx-0 lg:text-left">
          <a href="/faq" className="no-underline">
            FAQ
          </a>
          <a href="/legal" className="no-underline">
            Legal
          </a>
          <a href="/contact" className="no-underline">
            Contact
          </a>
        </div>
        <div className="mx-auto lg:mx-0 lg:text-right">
          Copyright © The Black Hart {thisYear}
        </div>
      </div>
      <Social />
    </footer>
  )
}
