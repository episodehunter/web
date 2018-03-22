import * as React from 'react'
import { inject } from 'mobx-react'
import { FrontPageShowStore } from '../../store/front-page-show.store'
import { Poster } from '../poster'

type Props = {
  showStore?: FrontPageShowStore
}

const MainShowsComponent = ({ showStore }: Props) => (
  <React.Fragment>
    {showStore!.shows.map(show => (
      <Poster key={show.id} tvdbId={show.tvdbId} zoom />
    ))}
  </React.Fragment>
)

export const MainShows = inject('frontPageShowStore')(MainShowsComponent)
