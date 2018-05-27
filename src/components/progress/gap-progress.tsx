import { Circle } from 'rc-progress'
import * as React from 'react'
import { melrose } from '../../utils/colors'

type Props = {
  percent: number
  width: number | string
  height: number | string
}

export const GapProgress = ({ percent, height, width }: Props) => (
  <div style={{ height, width }}>
    <Circle
      percent={percent}
      gapDegree={70}
      gapPosition="bottom"
      strokeWidth="6"
      strokeLinecap="square"
      strokeColor={melrose}
    />
  </div>
)
