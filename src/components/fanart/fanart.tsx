import { LazyLoadBackgroundImage } from '@tjoskar/react-lazyload-img'
import * as React from 'react'
import styled from 'styled-components'
import { hexToRgb } from '../../utils/color.util'
import { shark } from '../../utils/colors'

type Props = {
  imagePath: string
}

const style = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 0',
  backgroundSize: 'cover',
  transition: 'background-image 1s ease-in-out',
  display: 'flex',
  alignItems: 'flex-end'
}

export const Fanart = ({ imagePath }: Props) => (
  <LazyLoadBackgroundImage
    width="100%"
    height="90vh"
    style={style}
    defaultImage="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQYGBgYICQgJCAwLCgoLDBINDg0ODRIbERQRERQRGxgdGBYYHRgrIh4eIisyKigqMjw2NjxMSExkZIYBCgoKCgoKCwwMCw8RDxEPFxUTExUXIhkaGRoZIjQhJiEhJiE0LjguKy44LlNBOjpBU2BRTFFgdGhodJOLk8DA///AABEIAAUABQMBEQACEQEDEQH/xABcAAEAAAAAAAAAAAAAAAAAAAAHEAEAAgEFAAAAAAAAAAAAAAACAQMRAAQFB0EBAQEAAAAAAAAAAAAAAAAAAAMEEQAABQUAAAAAAAAAAAAAAAAAAQIDQRITISKR/9oADAMBAAIRAxEAPwAZjt2+oGm3hNumMwmLmIUx7ic6mtPQ/iNSC1plsuj/2Q=="
    image={imagePath}
  >
    <BottomGradient />
  </LazyLoadBackgroundImage>
)

const BottomGradient = styled.div`
  padding: 20px;
  flex-grow: 1;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(${hexToRgb(shark).join(',')}, 1)
  );
`
