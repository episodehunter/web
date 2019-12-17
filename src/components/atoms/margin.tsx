import React, { createElement, ReactHTML, CSSProperties } from 'react'

interface Props {
  top?: number
  right?: number
  bottom?: number
  left?: number
  all?: number
  inline?: boolean
  component?: keyof ReactHTML
  style?: CSSProperties
}

export const Margin: React.FC<Props> = props => {
  const style: CSSProperties = Object.assign(props.style || {}, {
    margin: props.all,
    marginTop: props.top,
    marginRight: props.right,
    marginBottom: props.bottom,
    marginLeft: props.left,
    display: props.inline ? 'inline-block' : 'block'
  })
  const component = props.component || 'span'
  return createElement(component, { style }, props.children)
}
