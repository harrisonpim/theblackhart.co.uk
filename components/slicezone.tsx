import Glyph from './glyph'
import ImageWithCaption from './imageWithCaption'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../prismic.config'

export default function SliceZone({ sliceZone }) {
  return (
    <div className="prose">
      {sliceZone.map((slice) => {
        switch (slice.slice_type) {
          case 'img':
            return <ImageWithCaption slice={slice} />
          case 'text':
            return (
              <RichText
                render={slice.primary.text}
                linkResolver={linkResolver}
              />
            )
          case 'glyph':
            return <Glyph slice={slice} />
          default:
            return null
        }
      })}
    </div>
  )
}
