// import { addDays, startOfDay } from 'date-fns'
// import { UpcomingStore } from '../upcoming'

// describe('Upcoming', () => {
//   test('Assemble a upcoming object', () => {
//     // Arrange
//     const today = () => startOfDay(new Date('2018-04-06'))
//     const following = {
//       shows: [
//         {
//           // Just aird and TBA
//           id: 1,
//           previousEpisode: {
//             firstAired: addDays(today(), -1)
//           },
//           isAirDateForNextEpisodeDateUnknown: true,
//           nextEpisode: null
//         },
//         {
//           // TBA
//           id: 2,
//           previousEpisode: {
//             firstAired: addDays(today(), -6)
//           },
//           isAirDateForNextEpisodeDateUnknown: false,
//           nextEpisode: null
//         },
//         {
//           // Today
//           id: 3,
//           previousEpisode: null,
//           isAirDateForNextEpisodeDateUnknown: false,
//           nextEpisode: {
//             firstAired: today()
//           }
//         },
//         {
//           // Next week
//           id: 4,
//           previousEpisode: null,
//           isAirDateForNextEpisodeDateUnknown: false,
//           nextEpisode: {
//             firstAired: addDays(today(), 6)
//           }
//         },
//         {
//           // Upcoming
//           id: 5,
//           previousEpisode: null,
//           isAirDateForNextEpisodeDateUnknown: false,
//           nextEpisode: {
//             firstAired: addDays(today(), 7)
//           }
//         }
//       ]
//     }
//     const store = new UpcomingStore(following as any, today)

//     // Act
//     const result = store.upcoming

//     // Assert
//     expect(result.justAired.length).toBe(1)
//     expect(result.justAired[0]).toBe(following.shows[0])
//     expect(result.today.length).toBe(1)
//     expect(result.today[0]).toBe(following.shows[2])
//     expect(result.weekAhead.length).toBe(1)
//     expect(result.weekAhead[0]).toBe(following.shows[3])
//     expect(result.upcoming.length).toBe(1)
//     expect(result.upcoming[0]).toBe(following.shows[4])
//     expect(result.tba.length).toBe(1)
//     expect(result.tba[0]).toBe(following.shows[0])
//   })

//   test('Just aird', () => {
//     // Arrange
//     const today = () => startOfDay(new Date('2018-04-06'))
//     const following = {
//       shows: [
//         {
//           id: 1,
//           previousEpisode: {
//             firstAired: addDays(today(), -5)
//           },
//           isAirDateForNextEpisodeDateUnknown: false,
//           nextEpisode: null
//         },
//         {
//           id: 2,
//           previousEpisode: {
//             firstAired: addDays(today(), -4)
//           },
//           isAirDateForNextEpisodeDateUnknown: false,
//           nextEpisode: null
//         }
//       ]
//     }
//     const store = new UpcomingStore(following as any, today)

//     // Act
//     const result = store.upcoming

//     // Assert
//     expect(result.justAired.length).toBe(1)
//   })

//   test('Today', () => {
//     // Arrange
//     const today = () => startOfDay(new Date('2018-04-06'))
//     const following = {
//       shows: [
//         {
//           id: 1,
//           previousEpisode: null,
//           nextEpisode: {
//             firstAired: addDays(today(), -1)
//           },
//           isAirDateForNextEpisodeDateUnknown: false
//         },
//         {
//           id: 2,
//           previousEpisode: null,
//           nextEpisode: {
//             firstAired: addDays(today(), 0)
//           },
//           isAirDateForNextEpisodeDateUnknown: false
//         },
//         {
//           id: 3,
//           previousEpisode: null,
//           nextEpisode: {
//             firstAired: addDays(today(), 1)
//           },
//           isAirDateForNextEpisodeDateUnknown: false
//         }
//       ]
//     }
//     const store = new UpcomingStore(following as any, today)

//     // Act
//     const result = store.upcoming

//     // Assert
//     expect(result.today.length).toBe(1)
//   })

//   test('Next week', () => {
//     // Arrange
//     const today = () => startOfDay(new Date('2018-04-06'))
//     const following = {
//       shows: [
//         {
//           id: 1,
//           previousEpisode: null,
//           nextEpisode: {
//             firstAired: addDays(today(), 0)
//           },
//           isAirDateForNextEpisodeDateUnknown: false
//         },
//         {
//           id: 2,
//           previousEpisode: null,
//           nextEpisode: {
//             firstAired: addDays(today(), 1)
//           },
//           isAirDateForNextEpisodeDateUnknown: false
//         },
//         {
//           id: 3,
//           previousEpisode: null,
//           nextEpisode: {
//             firstAired: addDays(today(), 6)
//           },
//           isAirDateForNextEpisodeDateUnknown: false
//         },
//         {
//           id: 4,
//           previousEpisode: null,
//           nextEpisode: {
//             firstAired: addDays(today(), 7)
//           },
//           isAirDateForNextEpisodeDateUnknown: false
//         }
//       ]
//     }
//     const store = new UpcomingStore(following as any, today)

//     // Act
//     const result = store.upcoming

//     // Assert
//     expect(result.weekAhead.length).toBe(2)
//     expect(result.weekAhead.map(s => s.id).join()).toBe('2,3')
//   })

//   test('Next week', () => {
//     // Arrange
//     const today = () => startOfDay(new Date('2018-04-06'))
//     const following = {
//       shows: [
//         {
//           id: 1,
//           previousEpisode: null,
//           nextEpisode: {
//             firstAired: addDays(today(), 6)
//           },
//           isAirDateForNextEpisodeDateUnknown: false
//         },
//         {
//           id: 2,
//           previousEpisode: null,
//           nextEpisode: {
//             firstAired: addDays(today(), 7)
//           },
//           isAirDateForNextEpisodeDateUnknown: false
//         }
//       ]
//     }
//     const store = new UpcomingStore(following as any, today)

//     // Act
//     const result = store.upcoming

//     // Assert
//     expect(result.upcoming.length).toBe(1)
//   })
// })
