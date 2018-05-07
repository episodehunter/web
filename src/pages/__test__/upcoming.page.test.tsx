import {
  extractNextEpisodeAirDate,
  extractPrevEpisodeAirDate
} from '../upcoming.page'

test('Extract air date of next episode', () => {
  // Arrange
  const firstAired = Symbol()
  const show = {
    nextEpisode: {
      firstAired
    }
  }

  // Act
  const result = extractNextEpisodeAirDate(show as any)

  // Assert
  expect(result).toBe(firstAired)
})

test('Return null when there is no next episode', () => {
  // Arrange
  const show = {
    nextEpisode: null
  }

  // Act
  const result = extractNextEpisodeAirDate(show as any)

  // Assert
  expect(result).toBe(null)
})

test('Extract air date of prev episode', () => {
  // Arrange
  const firstAired = Symbol()
  const show = {
    previousEpisode: {
      firstAired
    }
  }

  // Act
  const result = extractPrevEpisodeAirDate(show as any)

  // Assert
  expect(result).toBe(firstAired)
})

test('Return null when there is no prev episode', () => {
  // Arrange
  const show = {
    previousEpisode: null
  }

  // Act
  const result = extractPrevEpisodeAirDate(show as any)

  // Assert
  expect(result).toBe(null)
})
