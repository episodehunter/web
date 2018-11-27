import React from 'react';
import { dateReleaseFormat, Today, today } from '../../../utils/date.utils';
import { SmallText } from '../../text';

type Props = {
  firstAired: Date | null
  _today?: Today
}

export const AirDate = ({ firstAired, _today = today }: Props) => {
  return (
    <SmallText>
      {dateReleaseFormat(
        firstAired,
        {
          future: date => `📅 Aired ${date}`,
          past: date => `📅 Aired ${date}`
        },
        _today()
      )}
    </SmallText>
  )
}
