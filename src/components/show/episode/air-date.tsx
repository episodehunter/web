import { inject } from 'mobx-react'
import React from 'react'
import { dateReleaseFormat, Today } from '../../../utils/date.utils'
import { SmallText } from '../../text'

type Props = {
  firstAired: Date | null
  today?: Today
}

const AirDateComponent = ({ firstAired, today }: Props) => {
  return (
    <SmallText>
      {dateReleaseFormat(
        firstAired,
        {
          future: date => `📅 Aired ${date}`,
          past: date => `📅 Aired ${date}`
        },
        (today as Today)()
      )}
    </SmallText>
  )
}

export const AirDate = inject('today')(AirDateComponent)
