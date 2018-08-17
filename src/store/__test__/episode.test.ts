import startOfDay from 'date-fns/start_of_day'
import { Episode } from '../episode'

const today = () => startOfDay(new Date('2018-04-06'))

test('Has aird should not include today', () => {
  // Arrange
  const episode = Episode.createFromResponse(
    1,
    { name: 'E1', firstAired: '2018-04-06' } as any,
    null as any,
    today
  )

  // Act
  const result = episode.hasAird

  // Arrange
  expect(result).toBe(false)
})

test('Has aird should include yesterday', () => {
  // Arrange
  const episode = Episode.createFromResponse(
    1,
    { name: 'E1', firstAired: '2018-04-05' } as any,
    null as any,
    today
  )

  // Act
  const result = episode.hasAird

  // Arrange
  expect(result).toBe(true)
})

test('Will air should not include yesterday', () => {
  // Arrange
  const episode = Episode.createFromResponse(
    1,
    { name: 'E1', firstAired: '2018-04-05' } as any,
    null as any,
    today
  )

  // Act
  const result = episode.willAirInTheFuture

  // Arrange
  expect(result).toBe(false)
})

test('Will air should include today', () => {
  // Arrange
  const episode = Episode.createFromResponse(
    1,
    { name: 'E1', firstAired: '2018-04-06' } as any,
    null as any,
    today
  )

  // Act
  const result = episode.willAirInTheFuture

  // Arrange
  expect(result).toBe(true)
})

test('Will air should include tomorrow', () => {
  // Arrange
  const episode = Episode.createFromResponse(
    1,
    { name: 'E1', firstAired: '2018-04-07' } as any,
    null as any,
    today
  )

  // Act
  const result = episode.willAirInTheFuture

  // Arrange
  expect(result).toBe(true)
})
