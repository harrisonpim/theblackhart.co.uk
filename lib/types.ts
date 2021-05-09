import { RichTextBlock } from 'prismic-reactjs'

export type ImageProps = {
  slice: {
    primary: {
      caption?: RichTextBlock[]
      image: {
        url: string
        alt: string
        dimensions: { height: number; width: number }
      }
    }
  }
}
