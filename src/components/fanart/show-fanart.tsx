import { styled } from '@material-ui/core'
import { motion } from 'framer-motion'
import React from 'react'
import { images } from '../../images.config'
import { Fanart } from './fanart'

type Props = {
  tvdbId?: number | string
  animateFrom?: DOMRect
}

export const ShowFanart = React.memo(({ tvdbId, animateFrom }: Props) => {
  if (!tvdbId) {
    return null
  }

  if (animateFrom) {
    return (
      <Wrapper>
        <motion.div
          animate={{ y: -animateFrom.top, x: -animateFrom.left, width: '100%', height: '100%' }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: animateFrom.top,
            left: animateFrom.left,
            width: animateFrom.width,
            height: animateFrom.height,
            transformOrigin: 'left top',
          }}
        >
          <Fanart
            imagePath={images.fanart.big(tvdbId)}
            // imagePath={images.fanart.size(tvdbId, '842x472')}
            defaultImage={images.fanart.size(tvdbId, '842x472')}
          />
        </motion.div>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <Fanart imagePath={images.fanart.big(tvdbId)} />
      </Wrapper>
    )
  }
})

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: '90vh',
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
  position: 'relative',
}))
