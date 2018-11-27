import * as React from 'react';
import styled from 'styled-components';
import { Episode as EpisodeModel, State } from '../../../utils/firebase/types';
import { Spinner } from '../../spinner';
import { Episode } from './episode';

type Props = {
  episodes: State<EpisodeModel[]>
}

export const Episodes = ({ episodes }: Props) => {
  if (episodes.status !== 'loaded') {
    return <Spinner />
  }
  return (
  <Wrapper>
    {episodes.data!.map(episode => (
      <Episode key={episode.tvdbId} episode={episode} />
    ))}
  </Wrapper>
)}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
