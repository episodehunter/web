import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { requireLogin } from '../utils/require-login'
import { shark } from '../utils/colors'
// import { Spinner } from '../components/spinner'
import { Following } from '../store/following'
import { UpcomingViewStore } from '../store/upcoming.view.store'
// import { Upcoming } from '../components/upcoming'

type Props = {
  following?: Following
}

export class UpcomingPageComponent extends React.Component<Props> {
  model: UpcomingViewStore

  componentDidMount() {
    this.model = new UpcomingViewStore(this.props.following)
  }

  render() {
    const { following } = this.props
    return (
      <Wrapper>
        <UpcomingWrapper>
          {following.loading ? (
            <p>Loading</p>
          ) : following.shows.state === 'fulfilled' ? (
            following.shows.value.map((show: any, i) => {
              return <p key={i}>{show.name}</p>
            })
          ) : (
            <p>Loading shows</p>
          )}
        </UpcomingWrapper>
      </Wrapper>
    )
  }
}

export const UpcomingPage = requireLogin<Props>(
  inject('following')(observer(UpcomingPageComponent))
)

const UpcomingWrapper = styled.div`
  width: 80%;
`

// const Loading = styled.div`
//   text-align: center;
// `

const Wrapper = styled.div`
  margin-top: 70px;
  height: 100%;
  background-color: ${shark};
  display: flex;
  justify-content: center;
`
