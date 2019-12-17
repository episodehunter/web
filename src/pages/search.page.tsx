import { InputBase, styled } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { motion } from 'framer-motion'
import React from 'react'
import { PageWrapper } from '../components/atoms/page-wrapper'
import { Margin } from '../components/atoms/margin'
import { ShowListWrapper } from '../components/atoms/show-list-wrapper'
import { ShowCard } from '../components/show-card/show-card'
import { useSearch } from '../contexts/search-context'
import { SpinnerPage } from './spinner.page'
import { ShowOnlyOnMobile } from '../styles/media-queries'

// TODO: Show error message
export const SearchPage = () => {
  const search = useSearch()

  const clear = () => {
    search.search('')
  }

  return (
    <>
      <ShowOnlyOnMobile
        render={() => (
          <SearcBarhWrapper>
            <Margin left={16}>
              <InputBase
                placeholder="Search…"
                value={search.searchTerm}
                onChange={e => search.search(e.target.value)}
                autoFocus={true}
              />
            </Margin>
            <CloseIcon style={{ placeSelf: 'center' }} color="secondary" onClick={clear} />
          </SearcBarhWrapper>
        )}
      />
      <PageWrapper>
        {search.fetchStataus === 'loading' && <SpinnerPage />}
        <ShowOnlyOnMobile render={() => <Margin bottom={64} />} />
        <ShowListWrapper>
          {search.searchResult.map(show => {
            return (
              <motion.div key={show.id} layoutTransition>
                <ShowCard
                  key={show.id}
                  showId={show.id}
                  tvdbId={show.tvdbId}
                  showName={show.name}
                />
              </motion.div>
            )
          })}
        </ShowListWrapper>
      </PageWrapper>
    </>
  )
}

const SearcBarhWrapper = styled('div')({
  position: 'absolute',
  zIndex: 1,
  top: 0,
  left: 0,
  width: '100%',
  height: 48,
  display: 'grid',
  gridTemplateColumns: 'auto 50px',
  alignItems: 'center',
  backgroundColor: '#424242'
})
