import { FC } from 'react'
import Image from 'next/image'

type Props = { title: string; href: string; size: number }

const SvgIcon: FC<Props> = ({ title, href, size }) => {
  return (
    <div>
      <a href={href} title={title}>
        <Image
          width={size}
          height={size}
          src={`/icons/social/${title}.svg`.toLowerCase()}
          alt={title}
        ></Image>
      </a>
    </div>
  )
}
export default SvgIcon
