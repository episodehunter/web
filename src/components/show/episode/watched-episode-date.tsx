import { styled } from '@material-ui/core'
import { CheckCircleOutline } from '@material-ui/icons'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { WatchedEpisode } from '../../../types/episode'
import { whiteIsh } from '../../../utils/colors'
import { dateReleaseFormat, format } from '../../../utils/date.utils'
import { BottomTextWrapper } from '../../episode/bottom-text-wrapper'

interface Props {
  watched: WatchedEpisode[]
}

export const WatchedEpisodeDate = ({ watched }: Props) => {
  const latestWatched = getLatestWatchInfo(watched)
  if (!latestWatched) {
    return (
      <BottomTextWrapper style={{ background: 'none' }}>
        <AnimatePresence />
      </BottomTextWrapper>
    )
  }
  const time = latestWatched && new Date(latestWatched.time * 1000)
  return (
    <BottomTextWrapper>
      <AnimatePresence>
        {latestWatched && (
          <motion.div
            key={time.toString()}
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { damping: 0 }
            }}
            exit={{ opacity: 0 }}
          >
            <CheckIcon />
            <DateText title={`You wached this episode at ${format(time, 'do MMM yyyy')}`}>
              {dateReleaseFormat(time)}
            </DateText>
          </motion.div>
        )}
      </AnimatePresence>
    </BottomTextWrapper>
  )
}

function getLatestWatchInfo(watched: WatchedEpisode[]): WatchedEpisode | null {
  if (watched.length === 0) {
    return null
  }
  return watched.reduce((prev, curr) => {
    return prev.time > curr.time ? prev : curr
  })
}

const DateText = styled('p')({
  fontSize: '14px',
  color: whiteIsh,
  margin: 0,
  display: 'inline-block'
})

const CheckIcon = styled(CheckCircleOutline)({
  color: '#35e035',
  margin: '-2px 4px',
  fontSize: 'inherit'
})
