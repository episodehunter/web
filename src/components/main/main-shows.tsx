import * as React from 'react'
import { inject } from 'mobx-react'
import { ShowStore } from '../../store/show.store'
import { Poster } from '../poster'

type Props = {
  showStore?: ShowStore
}

const MainShowsComponent = ({ showStore }: Props) => (
  <React.Fragment>
    {showStore!.shows.map(show => (
      <Poster key={show.id} tvdbId={show.tvdbId} />
    ))}
  </React.Fragment>
)

export const MainShows = inject('showStore')(MainShowsComponent)
