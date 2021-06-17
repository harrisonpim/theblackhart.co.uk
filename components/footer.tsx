import Image from 'next/image'
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
