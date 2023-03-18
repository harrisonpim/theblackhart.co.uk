import Image from 'next/image'
import Link from 'next/link'

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
            className="object-contain"
            fill
            sizes="(max-width: 600px) 100vw, 600px"
            quality={100}
          />
        </div>
        <div className="flex-grow border-t border-white" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 row-gap-2 pt-1 lg:pt-0">
        <div className="flex gap-5 mx-auto lg:mx-0 lg:text-left">
          <Link href="/faq">FAQ</Link>
          <Link href="/legal">Legal</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="mx-auto lg:mx-0 lg:text-right">
          Copyright © The Black Hart {thisYear}
        </div>
      </div>
      <div className="flex space-x-4 justify-center py-3">
        <a href="https://www.tiktok.com/@tbh_jewellery" title="TikTok">
          <Image
            width={24}
            height={24}
            src="/icons/social/tiktok.svg"
            alt="TikTok"
          />
        </a>
        <a href="https://www.instagram.com/tbh_jewellery/" title="Instagram">
          <Image
            width={24}
            height={24}
            src="/icons/social/instagram.svg"
            alt="Instagram"
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UCfUqXisYyNzQcRDPxP_SizQ"
          title="YouTube"
        >
          <Image
            width={24}
            height={24}
            src="/icons/social/youtube.svg"
            alt="YouTube"
          />
        </a>
      </div>
    </footer>
  )
}
