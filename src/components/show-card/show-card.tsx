import { Card, CardActionArea, CardContent, CardMedia, Chip } from '@material-ui/core'
import React, { useRef } from 'react'
import { useNavigation } from 'the-react-router'
import { images } from '../../images.config'
import { episodeNumberToString } from '../../utils/episode.util'
import { H5, Subtitle2 } from '../atoms/Typography'

type Props = {
  showId: number
  tvdbId: number
  showName: string
  episodeNumber?: number | null
  episodeName?: string | null
  episodeAirDate?: string | null
  bottomText?: string
}

export const ShowCard = ({
  showId,
  tvdbId,
  showName,
  episodeNumber,
  episodeName,
  episodeAirDate,
  bottomText
}: Props) => {
  const { navigate } = useNavigation()
  const imageRef = useRef<HTMLImageElement>(null)

  return (
    <>
      <Card
        onClick={() =>
          navigate(`/show/${showId}/${tvdbId}`, imageRef.current?.getBoundingClientRect())
        }
      >
        <CardActionArea>
          <div style={{ position: 'relative' }}>
            {episodeAirDate && (
              <Chip
                label={episodeAirDate}
                style={{ position: 'absolute', bottom: '5px', right: '5px' }}
              />
            )}
            <CardMedia
              ref={imageRef}
              component="img"
              alt={showName}
              height="140"
              image={images.fanart.big(tvdbId)}
              title={showName}
            />
          </div>
          <CardContent>
            <H5>{showName}</H5>
            {episodeNumber && episodeName && (
              <Subtitle2>
                {episodeNumberToString(episodeNumber)} - {episodeName}
              </Subtitle2>
            )}
            {bottomText && <Subtitle2>{bottomText}</Subtitle2>}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}
