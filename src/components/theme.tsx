import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React, { FC } from 'react'
import { colors, mainBlue, whiteIsh, alabaster } from '../utils/colors'

interface Props {
  key?: string
}

const theme = createMuiTheme({
  palette: {
    primary: colors.palette.primary,
    secondary: colors.palette.secondary,
    type: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
    },
  },
  typography: {
    allVariants: {
      color: '#FFFFFF',
    },
    fontFamily: `'Lato', sans-serif`,
    h1: {
      fontSize: '60px',
      fontWeight: 300,
      textTransform: 'uppercase',
      color: alabaster,
    },
    h2: {
      fontSize: '32px',
      fontWeight: 300,
      color: alabaster,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 400,
      textTransform: 'uppercase',
      color: whiteIsh,
    },
    h4: {
      fontSize: '20px',
      fontWeight: 400,
      color: whiteIsh,
      letterSpacing: '0.5px',
    },
    h5: {
      fontSize: '1.3rem',
    },
    body1: {
      fontSize: '16px',
      lineHeight: '22px',
      letterSpacing: '0.35px',
      fontFamily: 'Helvetica Neue',
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.35px',
      fontFamily: 'Helvetica Neue',
    },
    subtitle1: {
      fontSize: '18px',
      color: mainBlue,
    },
    subtitle2: {
      fontSize: '12px',
      color: mainBlue,
    },
    caption: {
      fontSize: '12px',
    },
  },
})

export const Theme: FC<Props> = ({ children, key }) => {
  return React.createElement(MuiThemeProvider, { theme, key, children })
}
