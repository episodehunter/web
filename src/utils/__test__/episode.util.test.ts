import { startOfDay } from 'date-fns'
import { Episode } from '../../store/episode'
import { previousEpisode } from '../episode.util'

describe('Calculate previous episode', () => {
  test('Return null if episodelist is empty', () => {
    // Arrange
    const episodes = []
    const now = () => new Date('2018-04-06')

    // Act
    const result = previousEpisode(episodes, now)

    // Assert
    expect(result).toBe(null)
  })

  test('Return null if episodelist is null', () => {
    // Arrange
    const episodes = null
    const now = () => new Date('2018-04-06')

    // Act
    const result = previousEpisode(episodes, now)

    // Assert
    expect(result).toBe(null)
  })

  test('Find just aird episodes', () => {
    // Arrange
    const now = () => startOfDay(new Date('2018-04-06'))
    const episodes = [
      Episode.createFromResponse(
        {
          name: 'E1',
          firstAired: '2018-04-04'
        } as any,
        now
      ),
      Episode.createFromResponse(
        {
          name: 'E2',
          firstAired: '2018-04-05'
        } as any,
        now
      ),
      Episode.createFromResponse(
        {
          name: 'E3',
          firstAired: '2018-04-06'
        } as any,
        now
      ),
      Episode.createFromResponse(
        {
          name: 'E4',
          firstAired: '2018-04-07'
        } as any,
        now
      )
    ]

    // Act
    const result = previousEpisode(episodes, now)

    // // Assert
    expect(result!.name).toBe('E2')
  })
})
