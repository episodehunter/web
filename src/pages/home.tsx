import * as React from 'react'
import styled from 'styled-components'
import { inject } from 'mobx-react'
import { ShowStore } from '../store/show.store'
import { auth } from '../auth'
import { requireLogin } from '../utils/require-login'
import { shark, gossamer } from '../utils/colors'

type Props = {
  showStore?: ShowStore
}

export class HomePageComponent extends React.Component<Props> {
  componentWillMount() {
    if (auth.isAuthenticated()) {
      // this.props.showStore!.shows[0].fetchEpisodes()
    }
  }

  render() {
    return (
      <Wrapper>
        <Header>LOGGED IN</Header>
        {this.props.showStore!.shows[0].episodes.length}
      </Wrapper>
    )
  }
}

export const HomePage = requireLogin<Props>(
  inject('showStore')(HomePageComponent)
)

const Header = styled.h1`
  color: ${gossamer};
  text-align: center;
  font-family: 'Lato' sans-serif;
  margin-top: 40px;
`
const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`
