import { episodeLeftText } from '../following'

test('Return caught-up text', () => {
  // Arrange
  const n = 0

  // Act
  const result = episodeLeftText(n)

  // Assert
  expect(result).toBe(`You're all caught up!`)
})

test('Return 5-episodes left text', () => {
  // Arrange
  const n = 5

  // Act
  const result = episodeLeftText(n)

  // Assert
  expect(result).toBe(`You have 5 episodes left`)
})
