import React from 'react'
import { InputBase } from '@material-ui/core'
import { useNavigation } from 'the-react-router'
import { useSearch } from '../../contexts/search-context'
import { Routes } from '../../routes'

export const SearchBar = () => {
  const search = useSearch()
  const navigation = useNavigation()

  const onChange = (term: string) => {
    if (term.length > 0 && !navigation.state.url.includes('/search')) {
      navigation.navigate(Routes.search)
    }
    search.search(term)
  }
  const onFocus = () => {
    if (search.searchTerm.length > 0 && !navigation.state.url.includes('/search')) {
      navigation.navigate(Routes.search)
    }
  }

  return (
    <InputBase
      placeholder="Search…"
      value={search.searchTerm}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
    />
  )
}
