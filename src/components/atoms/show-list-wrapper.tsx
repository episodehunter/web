import { styled } from '@material-ui/core'

export const ShowListWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridColumnGap: 20,
  gridRowGap: 20,
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  [theme.breakpoints.only('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}))
