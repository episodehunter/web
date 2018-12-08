import React from 'react';
import { melrose } from '../../../utils/colors';
import { dateReleaseFormat, Today, today } from '../../../utils/date.utils';
import { SmallText } from '../../text';

type Props = {
  firstAired: Date | null
  _today?: Today
}

export const AirDate = ({ firstAired, _today = today }: Props) => {
  const releaseText = dateReleaseFormat(
    firstAired,
    {
      future: date => `  Airs ${date}`,
      past: date => `  Aired ${date}`
    },
    _today()
  )
  if (!releaseText) {
    return null
  }
  return (
    <SmallText>
      <i className="material-icons" style={iconStyle}>calendar_today</i>
      {releaseText}
    </SmallText>
  )
}

const iconStyle = {
  fontSize: 'inherit',
  color: melrose
}
