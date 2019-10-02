import React from 'react'
import { safeJoin } from '@episodehunter/utils'
import { format, parse } from '../../utils/date.utils'
import { safeStringConvertion } from '../../utils/string.util'
import { HighlightSpan, P2 } from '../text'
import { Show } from '../../types/show'

export const Facts = ({ show }: { show: Show }) => {
  const premiere = show.airs.first ? format(parse(show.airs.first), 'do MMM -yy') : '-'
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <FactLine
        headline="Airs"
        info={buildAirsString(show.airs.day, show.airs.time, show.network)}
      />
      <FactLine headline="Premiered" info={premiere} />
      <FactLine headline="Language" info={safeStringConvertion(show.language)} />
      <FactLine headline="Runtime" info={safeStringConvertion(show.runtime)} />
      <FactLine headline="Genres" info={safeJoin(show.genre, ', ')} />
      <FactLine headline="Status" info={show.ended ? 'Ended' : 'Running'} />
      <FactLine headline="Followers" info={safeStringConvertion(show.followers)} />
    </ul>
  )
}

const FactLine = ({ headline, info }: { headline: string; info: string }) => (
  <li>
    <P2 margin={0}>
      <HighlightSpan>{headline}:</HighlightSpan> {info}
    </P2>
  </li>
)

const dayOfWeekString = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const buildAirsString = (
  dayOfWeek?: number | null,
  airsTime?: string | null,
  network?: string | null
) => {
  if (dayOfWeek && airsTime && network) {
    const airsDayOfWeek = dayOfWeekString[dayOfWeek]
    return `${airsDayOfWeek} at ${airsTime} on ${network}`
  } else if (airsTime && network) {
    return `${airsTime} on ${network}`
  } else if (dayOfWeek && airsTime) {
    const airsDayOfWeek = dayOfWeekString[dayOfWeek]
    return `${airsDayOfWeek} at ${airsTime}`
  } else if (dayOfWeek && network) {
    const airsDayOfWeek = dayOfWeekString[dayOfWeek]
    return `${airsDayOfWeek} on ${network}`
  } else if (network) {
    return `on ${network}`
  } else {
    return ''
  }
}
