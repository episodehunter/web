import * as React from 'react';
import styled from 'styled-components';
import { Episode as EpisodeModel, State, WatchedEpisode } from '../../../utils/firebase/types';
import { Spinner } from '../../spinner';
import { Episode } from './episode';

type Props = {
  episodes: State<EpisodeModel[]>
  watchedEpisode: State<WatchedEpisode[]>
  showId: string
}

export const Episodes = ({ episodes, watchedEpisode, showId }: Props) => {
  if (episodes.status !== 'loaded' || watchedEpisode.status !== 'loaded') {
    return <Spinner />
  }
  return (
  <Wrapper>
    {episodes.data!.map(episode => {
      const w = watchedEpisode.data!.find(e => e.episodeNumber === episode.episodeNumber)
      return <Episode key={episode.tvdbId} episode={episode} watched={w} showId={showId} />
    })}
  </Wrapper>
)}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
