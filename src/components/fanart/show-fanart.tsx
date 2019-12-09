import React from 'react'
import { styled, useMediaQuery, useTheme } from '@material-ui/core'
import { motion } from 'framer-motion'
import { images } from '../../images.config'
import { Fanart } from './fanart'

type Props = {
  tvdbId?: number | string
  animateFrom?: DOMRect
}

export const ShowFanart = React.memo(({ tvdbId, animateFrom }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  if (!tvdbId) {
    return null
  }

  if (animateFrom) {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const imageWidth = animateFrom.width
    const imageHeight = animateFrom.height
    const scaleX = windowWidth / imageWidth
    let scaleY = (0.9 * windowHeight) / imageHeight
    if (isMobile) {
      scaleY = 200 / imageHeight
    }
    return (
      <Wrapper>
        <motion.div
          animate={{ y: -animateFrom.top, x: -animateFrom.left, scaleX, scaleY }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            top: animateFrom.top,
            left: animateFrom.left,
            width: imageWidth,
            height: animateFrom.height,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0px 0px',
            backgroundSize: 'cover',
            transition: 'background-image 1s ease-in-out 0s',
            backgroundImage: `url("${images.fanart.big(tvdbId)}")`,
            transformOrigin: 'left top'
          }}
        />
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <Fanart imagePath={images.fanart.big(tvdbId)} height={isMobile ? '200px' : undefined} />
      </Wrapper>
    )
  }
})

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: '90vh',
  [theme.breakpoints.down('sm')]: {
    height: '200px'
  },
  position: 'relative'
}))
