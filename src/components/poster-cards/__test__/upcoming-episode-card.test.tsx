import * as React from 'react'
import * as renderer from 'react-test-renderer'
import {
  UpcomingEpisodeCardComponent,
  formatEpisodeAirDate
} from '../upcoming-episode-card'

test('Print TBA when air date is null', () => {
  // Arrange
  const airDate = null

  // Act
  const result = formatEpisodeAirDate(airDate)

  // Assert
  expect(result).toBe('TBA')
})

test('Print the date when air date is not null', () => {
  // Arrange
  const airDate = new Date('1523-06-06')

  // Act
  const result = formatEpisodeAirDate(airDate)

  // Assert
  expect(result).toBe('6 JUNE')
})

it('Poster renders correctly', () => {
  const tree = renderer
    .create(
      <UpcomingEpisodeCardComponent
        episodeAirDate={new Date('1523-06-06')}
        showId={5}
        showName="Some show name"
        tvdbId={5}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
