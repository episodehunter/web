import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { NextEpisodeToWatch } from '../../types/show'
import { dateReleaseFormat, parse } from '../../utils/date.utils'
import { episodeNumberToString } from '../../utils/episode.util'
import { Body2, H3 } from '../atoms/typography'
import { BottomContentOnImage } from '../episode/bottom-content-on-image'
import { EpisodeImage } from '../episode/episode-image'

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
              <BottomContentOnImage>
                <Body2>
                  {episodeNumberToString(episode.episodenumber)} {episode.name}
                  <br />
                  {dateReleaseFormat(parse(episode.aired), {
                    future: date => `Airs ${date}`,
                    past: date => `Aird ${date}`
                  })}
                </Body2>
              </BottomContentOnImage>
            </EpisodeImage>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
