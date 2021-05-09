import { ReactElement } from 'react'

export default function Nav(props): ReactElement {
  return (
    <nav {...props}>
      <ul className="flex space-x-4 justify-center uppercase" aria-label="nav">
        <li key="shop">
          <a className="no-underline" href="/shop">
            Shop
          </a>
        </li>
        <li key="commissions">
          <a className="no-underline" href="/commissions">
            Commissions
          </a>
        </li>
        <li key="blog">
          <a className="no-underline" href="/blog">
            Blog
          </a>
        </li>
        <li key="faq">
          <a className="no-underline" href="/faq">
            FAQ
          </a>
        </li>
      </ul>
    </nav>
  )
}
