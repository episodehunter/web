import { LazyLoadBackgroundImage } from '@tjoskar/react-lazyload-img'
import * as React from 'react'

type Props = {
  imagePath: string
}

const style = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 0',
  backgroundSize: 'cover',
  transition: 'background-image 1s ease-in-out'
}

export const Fanart = ({ imagePath }: Props) => (
  <LazyLoadBackgroundImage
    width="100%"
    height="90vh"
    style={style}
    defaultImage="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQYGBgYICQgJCAwLCgoLDBINDg0ODRIbERQRERQRGxgdGBYYHRgrIh4eIisyKigqMjw2NjxMSExkZIYBCgoKCgoKCwwMCw8RDxEPFxUTExUXIhkaGRoZIjQhJiEhJiE0LjguKy44LlNBOjpBU2BRTFFgdGhodJOLk8DA///AABEIAAUABQMBEQACEQEDEQH/xABcAAEAAAAAAAAAAAAAAAAAAAAHEAEAAgEFAAAAAAAAAAAAAAACAQMRAAQFB0EBAQEAAAAAAAAAAAAAAAAAAAMEEQAABQUAAAAAAAAAAAAAAAAAAQIDQRITISKR/9oADAMBAAIRAxEAPwAZjt2+oGm3hNumMwmLmIUx7ic6mtPQ/iNSC1plsuj/2Q=="
    image={imagePath}
  />
)
