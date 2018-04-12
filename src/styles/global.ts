import { injectGlobal } from 'styled-components'
import { shark } from '../utils/colors'

injectGlobal`
  html, body {
    margin: 0;
    height: 100%;
    background-color: ${shark};
  }
  #root {
    height: 100%;
  }
`
