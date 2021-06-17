import { FC } from 'react'
import Image from 'next/image'

type Props = {
  title: string
  href: string
}

const SvgIcon: FC<Props> = ({ title, href }) => {
  return (
    <a href={href} title={title}>
      <Image
        width={24}
        height={24}
        src={`/icons/social/${title}.svg`.toLowerCase()}
        alt={title}
      />
    </a>
  )
}
export default SvgIcon
