import { observer } from 'mobx-react-lite'
import React from 'react'
import { useEpisodeStore } from '../../global-context'
import { dateReleaseFormat, now } from '../../utils/date.utils'
import { composeSeasonAndEpisodeNumber } from '../../utils/episode.util'
import { BottomTextWrapper } from '../episode/bottom-text-wrapper'
import { EpisodeImage } from '../episode/episode-image'
import { H3, P2 } from '../text'

export const NextEpisode = observer(({ showId }: { showId: string }) => {
  const episodes = useEpisodeStore()
  const nextEpisode = episodes.findNextEpisodeToWatch(showId)
  if (!nextEpisode) {
    return null
  }
  return (
    <>
      <H3>Next episode to watch</H3>
      <EpisodeImage tvdbId={nextEpisode.tvdbId}>
        <BottomTextWrapper>
          <P2 margin={0}>
            {composeSeasonAndEpisodeNumber(nextEpisode.season, nextEpisode.episode)}{' '}
            {nextEpisode.name}
          </P2>
          <P2 margin={0}>
            {dateReleaseFormat(
              nextEpisode.aired,
              {
                future: date => `Airs ${date}`,
                past: date => `Aird ${date}`
              },
              now()
            )}
          </P2>
        </BottomTextWrapper>
      </EpisodeImage>
    </>
  )
})
