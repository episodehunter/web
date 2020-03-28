import React from 'react'
import { motion } from 'framer-motion'

interface Props {
  index?: number
}

export const AnimatedListItem: React.FC<Props> = ({ children, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate="visible"
      custom={index}
      variants={animationVariants}
    >
      {children}
    </motion.div>
  )
}

const animationVariants = {
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.07, damping: 0 },
  }),
}
