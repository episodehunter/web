import React from 'react'
import { melrose } from '../../../utils/colors'
import { dateReleaseFormat, parse } from '../../../utils/date.utils'
import { SmallText } from '../../text'

type Props = {
  firstAired: string
}

export const AirDate = ({ firstAired }: Props) => {
  const releaseText = dateReleaseFormat(parse(firstAired), {
    future: date => `  Airs ${date}`,
    past: date => `  Aired ${date}`
  })
  if (!releaseText) {
    return null
  }
  return (
    <SmallText>
      <i className="material-icons" style={iconStyle}>
        calendar_today
      </i>
      {releaseText}
    </SmallText>
  )
}

const iconStyle = {
  fontSize: 'inherit',
  color: melrose
}
