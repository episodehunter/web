import { styled } from '@material-ui/core'

export const ShowListWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridColumnGap: 20,
  gridRowGap: 20,
  justifyItems: 'center',
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(auto-fill, 421px)',
  },
}))
