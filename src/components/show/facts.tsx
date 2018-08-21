import React from 'react'
import { Show } from '../../store/show'
import { safeJoin } from '../../utils/array.util'
import { format } from '../../utils/date.utils'
import { safeStringConvertion } from '../../utils/string.util'
import { HighlightSpan, P2 } from '../text'

export const Facts = ({ show }: { show: Show }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <FactLine
      headline="Airs"
      info={buildAirsString(show.airsDayOfWeek, show.airsTime, show.network)}
    />
    <FactLine
      headline="Premiered"
      info={format(show.firstAired, 'Do MMM -YY')}
    />
    <FactLine headline="Language" info={safeStringConvertion(show.language)} />
    <FactLine headline="Runtime" info={safeStringConvertion(show.runtime)} />
    <FactLine headline="Genres" info={safeJoin(show.genre, ', ')} />
    <FactLine headline="Status" info={show.ended ? 'Ended' : 'Running'} />
    <FactLine
      headline="Followers"
      info={safeStringConvertion(show.numberOfFollowers)}
    />
  </ul>
)

const FactLine = ({ headline, info }: { headline: string; info: string }) => (
  <li>
    <P2 margin={0}>
      <HighlightSpan>{headline}:</HighlightSpan> {info}
    </P2>
  </li>
)

const buildAirsString = (
  airsDayOfWeek: string,
  airsTime: string,
  network: string
) =>
  Boolean(airsDayOfWeek && airsTime && network)
    ? `${airsDayOfWeek} at ${airsTime} on ${network}`
    : ''
