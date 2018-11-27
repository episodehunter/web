import { observer } from 'mobx-react';
import React from 'react';
import { dateReleaseFormat, format } from '../../../utils/date.utils';
import { Episode } from '../../../utils/firebase/types';
import { BottomTextWrapper } from '../../episode/bottom-text-wrapper';
import { P } from '../../text';

type Props = {
  episode: Episode
}

const WatchedEpisodeDateComponent = ({ episode }: Props) => {
  const latestWatchedDate = null
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
        ✅ {dateReleaseFormat(latestWatchedDate)}
      </P>
    </BottomTextWrapper>
  )
}

export const WatchedEpisodeDate = observer(WatchedEpisodeDateComponent)
