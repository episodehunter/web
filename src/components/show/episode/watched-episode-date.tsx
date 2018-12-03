import React from 'react';
import { dateReleaseFormat, format } from '../../../utils/date.utils';
import { WatchedEpisode } from '../../../utils/firebase/types';
import { BottomTextWrapper } from '../../episode/bottom-text-wrapper';
import { P } from '../../text';

type Props = {
  watched: WatchedEpisode | undefined
}

export const WatchedEpisodeDate = ({ watched }: Props) => {
  const latestWatchedDate = watched && watched.time
  if (!latestWatchedDate) {
    return null
  }
  return (
    <BottomTextWrapper>
      <P
        margin={0}
        title={`You wached this episode at ${format(
          latestWatchedDate,
          'Do MMM YYYY'
        )}`}
      >
        <i style={textStyle} className="material-icons">check_circle_outline</i> {dateReleaseFormat(latestWatchedDate)}
      </P>
    </BottomTextWrapper>
  )
}

const textStyle = {
  color: '#35e035',
  fontSize: 'inherit'
}
