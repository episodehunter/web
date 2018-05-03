import * as React from 'react'
import { SmallShowPoster } from '../poster/small-show-poster'

const mainShows = [
  { tvdbId: 260449 },
  { tvdbId: 80379 },
  { tvdbId: 78804 },
  { tvdbId: 175001 },
  { tvdbId: 153021 },
  { tvdbId: 72449 },
  { tvdbId: 247897 },
  { tvdbId: 328724 },
  { tvdbId: 270915 }
]

export const MainShows = () => (
  <React.Fragment>
    {mainShows.map(show => (
      <SmallShowPoster key={show.tvdbId} tvdbId={show.tvdbId} />
    ))}
  </React.Fragment>
)
