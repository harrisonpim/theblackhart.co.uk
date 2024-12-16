import { FC, ReactNode } from 'react'

import Footer from './footer'
import Head from 'next/head'
import Header from './header'
import Banner from './banner'

type Props = {
  children?: ReactNode
  title?: string
  description?: string
  includeFooter?: boolean
  includeHeader?: boolean
}

const Layout: FC<Props> = ({
  children,
  includeFooter = true,
  includeHeader = true,
  title = 'The Black Hart',
  description = null,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
    </Head>
    <Banner />
    <div className="lg:w-4/5 xl:w-7/12 lg:px-0 px-4 mx-auto antialiased">
      <div className="min-h-screen relative">
        {includeHeader ? <Header key="header" /> : null}
        <main className="pb-40 lg:pb-32" key="main">
          {children}
        </main>
        {includeFooter ? <Footer key="footer" /> : null}
      </div>
    </div>
  </div>
)

export default Layout
