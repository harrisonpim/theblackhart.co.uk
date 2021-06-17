import { RichTextBlock } from 'prismic-reactjs'

export type ImageType = {
  url: string
  alt: string
  dimensions: { height: number; width: number }
}

export type ImageProps = {
  slice: {
    primary: {
      caption?: RichTextBlock[]
      image: ImageType
    }
  }
}
