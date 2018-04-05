import * as React from 'react'
import styled from 'styled-components'
import { match } from 'react-router'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { ShowsStore } from '../store/show.store'
import { ShowStore } from '../store/show'
import { Spinner } from '../components/spinner'
import { images } from '../images.config'
import { alabaster, melrose, gossamer } from '../utils/colors'
import { Episode } from '../components/episode'

type Props = {
  match: match<{ id: string }>
  showsStore?: ShowsStore
}

class ShowPageComponent extends React.Component<Props> {
  @observable show: ShowStore
  @observable selectedSeason: number

  componentDidMount() {
    const { match, showsStore } = this.props
    showsStore.getShow(Number(match.params.id)).then(
      action((show: ShowStore) => {
        this.show = show
        this.selectedSeason = this.show.seasons[0]
      })
    )
  }

  @action
  setSeason = (season: number) => {
    this.selectedSeason = season
  }

  render() {
    if (!this.show) {
      return <Spinner />
    }
    return (
      <Wrapper>
        {/* <FanartWrapper>
          <Fanart src={images.fanart.big(this.show.tvdbId)} />
        </FanartWrapper> */}
        <AboutWrapper>
          <PosterWrapper>
            <Poster src={images.poster.small(this.show.tvdbId)} />
          </PosterWrapper>
          <DescriptionWrapper>
            <Header>{this.show.name}</Header>
            <Description>{this.show.overview}</Description>
          </DescriptionWrapper>
        </AboutWrapper>
        <MenuWrapper>
          {this.show.seasons.map(season => (
            <MenuItemWrapper key={season}>
              <MenuItem
                selected={season === this.selectedSeason}
                onClick={() => this.setSeason(season)}
              >
                {'Season ' + season}
              </MenuItem>
            </MenuItemWrapper>
          ))}
        </MenuWrapper>
        <EpisodesWrapper>
          {this.show
            .episodesPerSeason(this.selectedSeason)
            .map(episode => <Episode episode={episode} />)}
        </EpisodesWrapper>
      </Wrapper>
    )
  }
}

export const ShowPage = inject('showsStore')(observer(ShowPageComponent))

const EpisodesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`

const AboutWrapper = styled.div`
  display: flex;
`
const PosterWrapper = styled.div``

const Poster = styled.img.attrs({
  src: (props: { src?: string }) => props.src
})`
  width: 100%;
`

const DescriptionWrapper = styled.div`
  flex: 1;
  margin: 0 20px;
`
const Header = styled.div`
  font-size: 42px;
  color: ${melrose};
  font-family: 'Lato', sans-serif;
  margin-bottom: 10px;
`

const Description = styled.div`
  color: ${alabaster};
  font-family: 'Lato', sans-serif;
`

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 10px 0;
`
const MenuItemWrapper = styled.div``

const MenuItem = styled.span`
  display: inline-block;
  cursor: pointer;
  flex: 1;
  margin-bottom: 10px;
  color: ${alabaster};
  font-family: 'Lato', sans-serif;

  :after {
    display: block;
    content: '';
    border-bottom: 2px solid ${gossamer};
    width: ${(props: { selected: boolean }) => (!props.selected ? 0 : '100%')};
    transition: width 250ms ease-in-out;
  }
  &:hover:after {
    width: 100%;
  }
`

// const Fanart = styled.img.attrs({
//   src: (props: { src?: string }) => props.src
// })`
//   width: 100%;
// `

// const FanartWrapper = styled.div``

const Wrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
