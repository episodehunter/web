import React, { ClassAttributes, InputHTMLAttributes } from 'react'
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
type State = {
  floating: boolean
  focused: boolean
  value?: string
}

export class FloatingLabel extends React.Component<Props, State> {
  state = {
    floating: false,
    focused: false,
    value: this.props.value
  }

  handleChange = evt => {
    const value = evt.target.value

    if (this.props.onChange) {
      this.props.onChange(evt)
    }

    this.setState({ value })
  }

  handleFocusChange = evt => {
    if (this.props.onFocus && evt.type === 'focus') {
      this.props.onFocus(evt)
    } else if (this.props.onBlur && evt.type !== 'focus') {
      this.props.onBlur(evt)
    }

    this.setState({ focused: evt.type === 'focus' })
  }

  isFloating(value: string | undefined, focused: boolean) {
    return (value && value.length) || focused
  }

  render() {
    const { value, focused } = this.state
    const styles = this.props.styles || {}
    const isFloating = this.isFloating(value, focused)
    const floatingStyle =
      isFloating && Object.assign({}, floatingStyles, styles.floating)
    const focusStyle = focused && Object.assign({}, focusStyles, styles.focus)
    const labelStyle = Object.assign({}, labelStyles, styles.label)
    const spanStyle = Object.assign({}, spanStyles, styles.span, floatingStyle)
    const inputStyle = Object.assign({}, inputStyles, styles.input, focusStyle)

    return (
      <label htmlFor={this.props.id} style={labelStyle}>
        <span style={spanStyle}>{this.props.placeholder}</span>
        <Input
          autoCapitalize={this.props.autoCapitalize}
          autoComplete={this.props.autoComplete}
          autoFocus={this.props.autoFocus}
          defaultValue={this.props.value}
          id={this.props.id}
          inputMode={this.props.inputMode}
          max={this.props.max}
          maxLength={this.props.maxLength}
          min={this.props.min}
          minLength={this.props.minLength}
          name={this.props.name}
          onBlur={this.handleFocusChange}
          onChange={this.handleChange}
          onFocus={this.handleFocusChange}
          pattern={this.props.pattern}
          readOnly={this.props.readOnly}
          required={this.props.required}
          spellCheck={false}
          step={this.props.step}
          style={inputStyle}
          type={this.props.type}
        />
      </label>
    )
  }
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
  fontSize: '0.625rem',
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
