import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../prismic.config'

export default function Details({ data }) {
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
