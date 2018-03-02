import * as React from 'react'
import { inject } from 'mobx-react'
import styled from 'styled-components'
import { MovieStore } from '../store/movie.store'

type Props = {
  movieStore: MovieStore
}

const MoviesPageComponent = ({ movieStore }: Props) => (
  <Wrapper>{movieStore.movies[0].title}</Wrapper>
)

export const MoviesPage = inject('movieStore')(MoviesPageComponent)

const Wrapper = styled.div``
