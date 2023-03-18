import Link from 'next/link'
import { ReactElement } from 'react'

export default function Nav(props): ReactElement {
  return (
    <nav {...props}>
      <ul className="flex space-x-4 justify-center uppercase" aria-label="nav">
        <li key="shop">
          <Link href="/shop">Shop</Link>
        </li>
        <li key="commissions">
          <Link href="/commissions">Commissions</Link>
        </li>
        <li key="blog">
          <Link href="/blog">Blog</Link>
        </li>
        <li key="faq">
          <Link href="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  )
}
