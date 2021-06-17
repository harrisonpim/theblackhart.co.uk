import Link from 'next/link'
import { ReactElement } from 'react'

export default function Nav(props): ReactElement {
  return (
    <nav {...props}>
      <ul className="flex space-x-4 justify-center uppercase" aria-label="nav">
        <li key="shop">
          <Link href="/shop">
            <a className="no-underline">Shop</a>
          </Link>
        </li>
        <li key="commissions">
          <Link href="/commissions">
            <a className="no-underline">Commissions</a>
          </Link>
        </li>
        <li key="blog">
          <Link href="/blog">
            <a className="no-underline">Blog</a>
          </Link>
        </li>
        <li key="faq">
          <Link href="/faq">
            <a className="no-underline">FAQ</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
