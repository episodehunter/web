import React from 'react'
import { melrose } from '../../../utils/colors'
import { dateReleaseFormat, parse } from '../../../utils/date.utils'
import { Subtitle2 } from '../../atoms/typography'

type Props = {
  firstAired: string
}

export const AirDate = ({ firstAired }: Props) => {
  const releaseText = dateReleaseFormat(parse(firstAired), {
    future: date => `  Airs ${date}`,
    past: date => `  Aired ${date}`,
  })
  if (!releaseText) {
    return null
  }
  return (
    <Subtitle2>
      <i className="material-icons" style={iconStyle}>
        calendar_today
      </i>
      {releaseText}
    </Subtitle2>
  )
}

const iconStyle = {
  fontSize: 'inherit',
  color: melrose,
}
