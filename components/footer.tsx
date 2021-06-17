import Image from 'next/image'
import Link from 'next/link'
import Social from './social'

export default function Footer() {
  const thisYear = new Date().getFullYear()

  return (
    <footer className="absolute bottom-0 w-full text-sm">
      <div className=" flex items-center">
        <div className="flex-grow border-t border-white" />
        <div className="relative h-6 px-4">
          <Image
            src={
              'https://images.prismic.io/theblackhart/616f657c-82b5-4bc9-ae55-c44dc45a72ba_tbh.png?auto=compress,format'
            }
            alt="TBH"
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </div>
        <div className="flex-grow border-t border-white" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 row-gap-2 pt-1 lg:pt-0">
        <div className="flex gap-5 mx-auto lg:mx-0 lg:text-left">
          <Link href="/faq">
            <a className="no-underline">FAQ</a>
          </Link>
          <Link href="/legal">
            <a className="no-underline">Legal</a>
          </Link>
          <Link href="/contact">
            <a className="no-underline">Contact</a>
          </Link>
        </div>
        <div className="mx-auto lg:mx-0 lg:text-right">
          Copyright © The Black Hart {thisYear}
        </div>
      </div>
      <Social />
    </footer>
  )
}
