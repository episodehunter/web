// import { startOfDay } from 'date-fns'
// import { Episode } from '../../store/episode'
// import { nextEpisodeToWatch, previousEpisode } from '../episode.util'

// describe('Calculate previous episode', () => {
//   test('Return null if episodelist is empty', () => {
//     // Arrange
//     const episodes = []
//     const now = () => new Date('2018-04-06')

//     // Act
//     const result = previousEpisode(episodes, now)

//     // Assert
//     expect(result).toBe(null)
//   })

//   test('Return null if episodelist is null', () => {
//     // Arrange
//     const episodes = null
//     const now = () => new Date('2018-04-06')

//     // Act
//     const result = previousEpisode(episodes, now)

//     // Assert
//     expect(result).toBe(null)
//   })

//   test('Find just aird episodes', () => {
//     // Arrange
//     const now = () => startOfDay(new Date('2018-04-06'))
//     const episodes = [
//       Episode.createFromResponse(
//         1,
//         {
//           name: 'E1',
//           firstAired: '2018-04-04'
//         } as any,
//         null as any,
//         now
//       ),
//       Episode.createFromResponse(
//         1,
//         {
//           name: 'E2',
//           firstAired: '2018-04-05'
//         } as any,
//         null as any,
//         now
//       ),
//       Episode.createFromResponse(
//         1,
//         {
//           name: 'E3',
//           firstAired: '2018-04-06'
//         } as any,
//         null as any,
//         now
//       ),
//       Episode.createFromResponse(
//         1,
//         {
//           name: 'E4',
//           firstAired: '2018-04-07'
//         } as any,
//         null as any,
//         now
//       )
//     ]

//     // Act
//     const result = previousEpisode(episodes, now)

//     // // Assert
//     expect(result!.name).toBe('E2')
//   })
// })

// describe('Calculate next episode to watch', () => {
//   test('Next episode is in the next season', () => {
//     // Arrange
//     const watchHistory = [
//       {
//         showId: 1,
//         season: 3,
//         episode: 9
//       },
//       {
//         showId: 1,
//         season: 3,
//         episode: 10
//       }
//     ]
//     const episodes = [
//       {
//         showId: 1,
//         season: 3,
//         episode: 9,
//         hasValidAirDate: true
//       },
//       {
//         showId: 1,
//         season: 3,
//         episode: 10,
//         hasValidAirDate: true
//       },
//       {
//         showId: 1,
//         season: 4,
//         episode: 1,
//         hasValidAirDate: true
//       },
//       {
//         showId: 1,
//         season: 4,
//         episode: 2,
//         hasValidAirDate: true
//       },
//       {
//         showId: 1,
//         season: 4,
//         episode: 3,
//         hasValidAirDate: false
//       }
//     ]

//     // Act
//     const result = nextEpisodeToWatch(watchHistory as any, episodes as any)

//     // Assert
//     expect(result).toBeDefined()
//     expect(result!.season).toBe(4)
//     expect(result!.episode).toBe(1)
//   })
// })
