import React, { useState } from 'react'
import { P } from './text'

type Props = { children?: string | null; length: number; style?: any }

export const EllipsisText = ({ children, length, style }: Props) => {
  const [showAllText, setShowAllText] = useState(false)
  if (!children) {
    return null
  }
  const textLength = children.length
  if (showAllText || textLength < length) {
    return <P style={style}>{children}</P>
  }
  return (
    <P style={{ ...style, cursor: 'pointer' }} onClick={() => setShowAllText(true)}>
      {children.substr(0, length)}...
    </P>
  )
}
