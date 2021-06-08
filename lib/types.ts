import { RichTextBlock } from 'prismic-reactjs'

export type Image = {
  url: string
  alt: string
  dimensions: { height: number; width: number }
}

export type ImageProps = {
  slice: {
    primary: {
      caption?: RichTextBlock[]
      image: Image
    }
  }
}
