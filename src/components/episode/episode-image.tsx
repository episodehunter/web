import { LazyLoadBackgroundImage } from '@tjoskar/react-lazyload-img'
import {
  differenceInCalendarDays,
  distanceInWords,
  format,
  isSameDay,
  isValid
} from 'date-fns'
import * as React from 'react'
import styled from 'styled-components'
import { images } from '../../images.config'
import { Episode as EpisodeType } from '../../store/episode'
import { today } from '../../utils/date.utils'
import { P } from '../text'

type Props = {
  episode: EpisodeType | null
}
export const EpisodeImage = ({ episode }: Props) =>
  episode && (
    <>
      <LazyLoadBackgroundImage
        width={250}
        height={140}
        style={{
          borderRadius: 5,
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'flex-end'
        }}
        defaultImage={`https://www.placecage.com/g/${250}/${140}`}
        image={images.episode.small(episode.tvdbId)}
      >
        <BottomTextWrapper>
          <BottomText>
            {episode.seasonAndEpisodeNumber} {episode.name}
          </BottomText>
          <BottomText>{dateFormat(episode.firstAired)}</BottomText>
        </BottomTextWrapper>
      </LazyLoadBackgroundImage>
    </>
  )

const dateFormat = (date: Date | null, _today = today()) => {
  if (!date || !isValid(date)) {
    return ''
  } else if (isSameDay(date, _today)) {
    return 'today 🎉'
  } else if (Math.abs(differenceInCalendarDays(date, _today)) < 7) {
    return distanceInWords(_today, date, { addSuffix: true }) + ' 🎉'
  } else {
    return format(date, 'Do MMM -YY')
  }
}

const BottomTextWrapper = styled.div`
  padding: 10px;
  flex-grow: 1;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) 30%);
`
const BottomText = styled(P)`
  margin: 0;
`
