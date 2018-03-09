import * as React from 'react'
import styled from 'styled-components'

type Props = {
  src: string
}
export const ShowCard = ({ src }: Props) => (
  <Wrapper>
    <Image src={src} />
  </Wrapper>
)

const Image = styled.img.attrs({
  src: (props: { src?: string }) => props.src
})`
  width: 100%;
`
const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1.05);
  }
`
