import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React, { FC } from 'react'
import { colors, mainBlue, whiteIsh } from '../utils/colors'

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
      secondary: '#FFFFFF'
    }
  },
  typography: {
    allVariants: {
      color: '#FFFFFF'
    },
    h3: {
      fontWeight: 300,
      textTransform: 'uppercase',
      color: whiteIsh,
      fontSize: '20px'
    },
    h4: {
      fontWeight: 400,
      color: whiteIsh,
      fontSize: '20px',
      letterSpacing: '0.5px'
    },
    h5: {
      fontSize: '1.3rem'
    },
    body1: {
      fontSize: '16px',
      lineHeight: '22px',
      letterSpacing: '0.35px',
      fontWeight: 400,
      fontFamily: 'Helvetica Neue'
    },
    subtitle2: {
      fontSize: '14px',
      color: mainBlue
    },
    subtitle1: {
      fontSize: '18px',
      color: mainBlue
    },
    fontFamily: `'Lato', sans-serif`
  }
})

export const Theme: FC<Props> = ({ children, key }) => {
  return React.createElement(MuiThemeProvider, { theme, key, children })
}
