import React, { ClassAttributes, InputHTMLAttributes, useState } from 'react'
import styled from 'styled-components'

type Styles = {
  styles?: {
    floating?: Object
    focus?: Object
    label?: Object
    span?: Object
    input?: Object
  }
}
type Props = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  Styles & { value?: string }

export const FloatingLabel = (props: Props) => {
  const [focused, setFocused] = useState(false)

  const handleFocusChange = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (props.onFocus && evt.type === 'focus') {
      props.onFocus(evt)
    } else if (props.onBlur && evt.type !== 'focus') {
      props.onBlur(evt)
    }

    setFocused(evt.type === 'focus')
  }

  const styles = props.styles || {}
  const isFloating = (props.value && props.value.length) || focused
  const floatingStyle = isFloating && Object.assign({}, floatingStyles, styles.floating)
  const focusStyle = focused && Object.assign({}, focusStyles, styles.focus)
  const labelStyle = Object.assign({}, labelStyles, styles.label)
  const spanStyle = Object.assign({}, spanStyles, styles.span, floatingStyle)
  const inputStyle = Object.assign({}, inputStyles, styles.input, focusStyle)

  return (
    <label htmlFor={props.id} style={labelStyle}>
      <span style={spanStyle}>{props.placeholder}</span>
      <Input
        value={props.value}
        autoCapitalize={props.autoCapitalize}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        id={props.id}
        inputMode={props.inputMode}
        max={props.max}
        maxLength={props.maxLength}
        min={props.min}
        minLength={props.minLength}
        name={props.name}
        onBlur={handleFocusChange}
        onChange={props.onChange}
        onFocus={handleFocusChange}
        pattern={props.pattern}
        readOnly={props.readOnly}
        required={props.required}
        spellCheck={false}
        step={props.step}
        style={inputStyle}
        type={props.type}
      />
    </label>
  )
}

const Input = styled.input`
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: rgb(38, 166, 154) !important;
  }
`

export const labelStyles = {
  boxSizing: 'border-box',
  display: 'inline-block',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
  paddingTop: 5,
  position: 'relative'
}

export const spanStyles = {
  boxSizing: 'border-box',
  fontSize: '1rem',
  left: 0,
  padding: '17px 0 13px 0',
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  transition: 'font-size 200ms, padding 200ms',
  zIndex: 1
}

export const floatingStyles = {
  fontSize: '1rem',
  padding: 0
}

export const inputStyles = {
  border: 'none',
  borderBottom: '1px solid black',
  boxSizing: 'border-box',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
  fontSize: '1rem',
  padding: '12px 0 8px 0',
  backgroundColor: 'transparent',
  width: '100%'
}

export const focusStyles = {
  borderColor: 'blue',
  outline: 'none'
}
