import React from 'react'
import { motion } from 'framer-motion'
import { useSearch } from '../contexts/search-context'
import { PageWrapper } from '../components/atoms/page-wrapper'
import { ShowCard } from '../components/show-card/show-card'
import { ShowListWrapper } from '../components/atoms/show-list-wrapper'
import { SpinnerPage } from './spinner.page'

export const SearchPage = () => {
  const search = useSearch()

  // TODO: Show error message here
  if (search.fetchStataus === 'loading') {
    return <SpinnerPage />
  }
  return (
    <PageWrapper>
      <ShowListWrapper>
        {search.searchResult.map(show => {
          return (
            <motion.div key={show.id} layoutTransition>
              <ShowCard key={show.id} showId={show.id} tvdbId={show.tvdbId} showName={show.name} />
            </motion.div>
          )
        })}
      </ShowListWrapper>
    </PageWrapper>
  )
}
