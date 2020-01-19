import React from 'react'
import { CircularProgress } from '@material-ui/core'

type Props = {
  size?: number
  style?: any
}

export const Spinner = ({ size = 50, style }: Props) => (
  <CircularProgress size={size} style={style} />
)
