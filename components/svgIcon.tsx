import { FC } from 'react'
import Image from 'next/image'
import imageLoader from 'lib/images'

type Props = {
  title: string
  href: string
}

const SvgIcon: FC<Props> = ({ title, href }) => {
  return (
    <div>
      <a href={href} title={title}>
        <img
          width={24}
          height={24}
          src={`/icons/social/${title}.svg`.toLowerCase()}
          alt={title}
        />
      </a>
    </div>
  )
}
export default SvgIcon
