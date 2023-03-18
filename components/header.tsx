import Image from 'next/image'
import Link from 'next/link'
import Nav from './nav'

export default function Header() {
  return (
    <header className="pt-2 pb-3">
      <Link href="/">
        <div className="relative h-12 w-auto mx-auto">
          <Image
            src="https://images.prismic.io/theblackhart/2c802944-e83b-4f0a-ac22-22daf94220ee_the_black_hart.png?auto=compress,format"
            alt="The Black Hart"
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </Link>
      <Nav className="mx-auto text-sm" />
    </header>
  )
}
