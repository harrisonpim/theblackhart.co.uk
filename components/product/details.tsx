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
    <details className="pb-3">
      <summary className="font-bold pb-2">
        {RichText.asText(data.title)}
      </summary>
      <div className="text-sm ">
        <RichText render={data.text} linkResolver={linkResolver} />
      </div>
    </details>
  )
}

export default Details
