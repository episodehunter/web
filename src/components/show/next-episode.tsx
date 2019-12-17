import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NextEpisodeToWatch } from '../../types/show'
import { dateReleaseFormat, parse } from '../../utils/date.utils'
import { episodeNumberToString } from '../../utils/episode.util'
import { BottomTextWrapper } from '../episode/bottom-text-wrapper'
import { EpisodeImage } from '../episode/episode-image'
import { H3, P2 } from '../text'

export const NextEpisode = ({
  episode,
  theTvDbShowId
}: {
  episode: NextEpisodeToWatch | null
  theTvDbShowId: number
}) => {
  if (!episode) {
    return null
  }
  return (
    <>
      <H3>Next episode to watch</H3>
      <div style={{ position: 'relative', width: 250, height: 140 }}>
        <AnimatePresence>
          <motion.div
            key={episode.ids.tvdb}
            initial={{ opacity: 0, x: 100, position: 'absolute', width: 250, height: 140 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { damping: 50 }
            }}
            exit={{ opacity: 0 }}
          >
            <EpisodeImage tvdbId={episode.ids.tvdb} theTvDbShowId={theTvDbShowId}>
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
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
