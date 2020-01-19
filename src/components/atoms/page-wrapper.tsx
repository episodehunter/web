import React from 'react'
import { styled } from '@material-ui/core'

export const PageWrapper: React.FC = ({ children }) => {
  return (
    <OuterWrapper>
      <InnerWrapper>{children}</InnerWrapper>
    </OuterWrapper>
  )
}

const InnerWrapper = styled('div')(({ theme }) => ({
  width: '95%',
  [theme.breakpoints.only('md')]: {
    width: '80%'
  },
  [theme.breakpoints.up('lg')]: {
    width: '80%'
  }
}))

const OuterWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: 70
  },
  [theme.breakpoints.down('sm')]: {
    paddingBottom: 70
  },
  display: 'flex',
  justifyContent: 'center'
}))
