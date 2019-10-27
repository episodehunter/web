import React from 'react'
import { NextEpisodeToWatch } from '../../types/show'
import { dateReleaseFormat, parse } from '../../utils/date.utils'
import { episodeNumberToString } from '../../utils/episode.util'
import { BottomTextWrapper } from '../episode/bottom-text-wrapper'
import { EpisodeImage } from '../episode/episode-image'
import { H3, P2 } from '../text'

export const NextEpisode = ({ episode }: { episode: NextEpisodeToWatch | null }) => {
  if (!episode) {
    return null
  }
  return (
    <>
      <H3>Next episode to watch</H3>
      <EpisodeImage tvdbId={episode.ids.tvdb}>
        <BottomTextWrapper>
          <P2 margin={0}>
            {episodeNumberToString(episode.episodenumber)} {episode.name}
          </P2>
          <P2 margin={0}>
            {dateReleaseFormat(parse(episode.aired), {
              future: date => `Airs ${date}`,
              past: date => `Aird ${date}`
            })}
          </P2>
        </BottomTextWrapper>
      </EpisodeImage>
    </>
  )
}
