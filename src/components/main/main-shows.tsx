import * as React from 'react'
import { inject } from 'mobx-react'
import { ShowCard } from '../show-card'
import { ShowStore } from '../../store/show.store'

type Props = {
  showStore?: ShowStore
}

const MainShowsComponent = ({ showStore }: Props) => (
  <React.Fragment>
    {showStore!.shows.map(show => <ShowCard key={show.id} src={show.src} />)}
  </React.Fragment>
)

export const MainShows = inject('showStore')(MainShowsComponent)
