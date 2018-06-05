import React from 'react'
import styled from 'styled-components'
import { mountainMeadow, silver } from '../../utils/colors'
import { FloatingLabel } from '../floating-label'

export class LoginFormComponent extends React.Component {
  render() {
    return (
      <FormWrapper>
        <FloatingLabel
          styles={styles}
          placeholder="email"
          type="email"
          required
        />
        <Space />
        <FloatingLabel
          styles={styles}
          placeholder="password"
          type="password"
          required
        />
        <Space />
        <LoginButton>Let me in</LoginButton>
      </FormWrapper>
    )
  }
}

const FormWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Space = styled.div`
  height: 40px;
`

const LoginButton = styled.button`
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  will-change: opacity, transform;
  transition: all 0.3s ease-out;
  text-decoration: none;
  color: #fff;
  background-color: #26a69a;
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

  &:hover {
    outline: none;
    background-color: #2ab7a9;
  }
`

const styles = {
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
