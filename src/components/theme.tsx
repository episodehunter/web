import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React, { FC } from 'react'
import { colors } from '../utils/colors'

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
    fontFamily: `'Lato', sans-serif`
  }
})

export const Theme: FC<Props> = ({ children, key }) => {
  return React.createElement(MuiThemeProvider, { theme, key, children })
}
