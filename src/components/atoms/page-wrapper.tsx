import React from 'react'
import { styled } from '@material-ui/core'
import { useNavigation } from 'the-react-router'
import { Routes } from '../../routes'

export const PageWrapper: React.FC = ({ children }) => {
  const { navigate } = useNavigation()
  const onSunsettingClick = () => {
    navigate(Routes.sunsetting)
  }
  return (
    <>
      {window.location.pathname !== '/sunsetting' && (
        <Sunsetting onClick={onSunsettingClick}>Episodehunter is sunsetting</Sunsetting>
      )}
      <OuterWrapper>
        <InnerWrapper>{children}</InnerWrapper>
      </OuterWrapper>
    </>
  )
}

const Sunsetting = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: 70,
  },
  backgroundColor: '#ddd39f',
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '40px',
  cursor: 'pointer',
}))

const InnerWrapper = styled('div')(({ theme }) => ({
  width: '95%',
  [theme.breakpoints.only('md')]: {
    width: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '80%',
  },
}))

const OuterWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingBottom: 70,
  },
  display: 'flex',
  justifyContent: 'center',
}))
