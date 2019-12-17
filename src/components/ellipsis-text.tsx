import React, { useState } from 'react'
import { Body1 } from './atoms/typography'

type Props = { children?: string | null; length: number; style?: any }

export const EllipsisText = ({ children, length, style }: Props) => {
  const [showAllText, setShowAllText] = useState(false)
  if (!children) {
    return null
  }
  const textLength = children.length
  if (showAllText || textLength < length) {
    return (
      <Body1 gutterBottom={true} style={style}>
        {children}
      </Body1>
    )
  }
  return (
    <Body1
      gutterBottom={true}
      style={{ ...style, cursor: 'pointer' }}
      onClick={() => setShowAllText(true)}
    >
      {children.substr(0, length)}...
    </Body1>
  )
}
