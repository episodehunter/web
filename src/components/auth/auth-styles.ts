import styled from 'styled-components'
import { mountainMeadow, silver } from '../../utils/colors'

export const AuthFormWrapper = styled.form`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Space = styled.div`
  height: 40px;
`

export const floatingLabelStyles = {
  label: {
    width: '100%'
  },
  input: {
    fontSize: '2rem',
    borderWidth: '2px',
    color: mountainMeadow,
    borderColor: silver
  },
  focus: {
    borderColor: mountainMeadow
  },
  span: {
    fontSize: '2rem',
    color: silver
  }
}
