import * as React from 'react'
import styled from 'styled-components'
import { inject } from 'mobx-react'
import { ShowStore } from '../store/show.store'
import { auth } from '../auth'
import { Redirect } from 'react-router'

type Props = {
  showStore?: ShowStore
}

export class SecretPageComponent extends React.Component<Props> {
  componentWillMount() {
    if (auth.isAuthenticated()) {
      this.props.showStore!.shows[0].fetchEpisodes()
    }
  }

  render() {
    if (!auth.isAuthenticated()) {
      return <Redirect to="/" />
    }
    return <Wrapper>{this.props.showStore!.shows[0].episodes.length}</Wrapper>
  }
}

export const SecretPage = inject('showStore')(SecretPageComponent)

const Wrapper = styled.div``
