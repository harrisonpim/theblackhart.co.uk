import { RichText, RichTextBlock } from 'prismic-reactjs'

import { FC } from 'react'
import { linkResolver } from '../../prismic.config'

type Props = {
  data: {
    title: RichTextBlock[]
    text: RichTextBlock[]
  }
}

const Details: FC<Props> = ({ data }) => {
  return (
    <details>
      <summary className="font-bold">{RichText.asText(data.title)}</summary>
      <div className="text-sm pt-2">
        <RichText render={data.text} linkResolver={linkResolver} />
      </div>
    </details>
  )
}

export default Details
