import styled from 'styled-components'

export const FormButton = styled.button`
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  will-change: opacity, transform;
  transition: all 0.3s ease-out;
  text-decoration: none;
  color: #fff;
  letter-spacing: 1px;
  transition: 0.2s ease-out;
  border: none;
  border-radius: 2px;
  padding: 0 2rem;
  text-transform: uppercase;
  line-height: 2.5rem;
  font-size: 1rem;
  box-shadow: 0 2px 5px 0 rgba(255, 255, 255, 0.16),
    0 2px 10px 0 rgba(255, 255, 255, 0.12);
  background-color: ${({ color }: { color: string }) => color};
  &:hover {
    outline: none;
    filter: brightness(110%);
  }
`
