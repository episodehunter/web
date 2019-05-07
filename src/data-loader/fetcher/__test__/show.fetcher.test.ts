import { spy } from 'simple-spy'
import { createShowFetcher } from '../show.fetcher'

describe('createShowFetcher', () => {
  test('Do not make any request if we have all the shows', async () => {
    // Arrange
    const client = spy()
    const storage = {
      showStorage: {
        findShow: spy((id: string) => Promise.resolve({ value: { ids: { id } } })),
        saveShow: spy()
      }
    }
    const ids = ['1', '2', '3']

    // Act
    const result = await createShowFetcher(client as any, storage as any).fetchShow(ids)

    // Assert
    expect(result.length).toBe(3)
    expect(client.callCount).toBe(0)
    expect(storage.showStorage.saveShow.callCount).toBe(0)
    expect(storage.showStorage.findShow.callCount).toBe(3)
  })

  test('Get all shows from the BE', async () => {
    // Arrange
    const client = spy(() =>
      Promise.resolve({
        id1: { ids: { id: '1' } },
        id2: { ids: { id: '2' } },
        id3: { ids: { id: '3' } }
      })
    )
    const storage = {
      showStorage: {
        findShow: spy(() => undefined),
        saveShow: spy()
      }
    }
    const ids = ['1', '2', '3']

    // Act
    const result = await createShowFetcher(client as any, storage as any).fetchShow(ids)

    // Assert
    expect(result.length).toBe(3)
    expect(client.callCount).toBe(1)
    expect(storage.showStorage.saveShow.callCount).toBe(3)
    expect(storage.showStorage.findShow.callCount).toBe(3)
  })

  test('Get some show from storage and som from BE', async () => {
    // Arrange
    const client = spy(() =>
      Promise.resolve({
        id1: { ids: { id: '1' } },
        id3: { ids: { id: '3' } }
      })
    )
    const storage = {
      showStorage: {
        findShow: spy((id: string) => {
          if (id === '2') {
            return { value: { ids: { id: '2' } } }
          }
          return undefined
        }),
        saveShow: spy()
      }
    }
    const ids = ['1', '2', '3']

    // Act
    const result = await createShowFetcher(client as any, storage as any).fetchShow(ids)

    // Assert
    expect(result.length).toBe(3)
    expect(client.callCount).toBe(1)
    expect(client.args[0][0].includes('id0: show(id: "1")')).toBe(true)
    expect(client.args[0][0].includes('id1: show(id: "3")')).toBe(true)
    expect(storage.showStorage.saveShow.callCount).toBe(2)
    expect(storage.showStorage.saveShow.args[0][0].ids.id).toBe('1')
    expect(storage.showStorage.saveShow.args[1][0].ids.id).toBe('3')
    expect(storage.showStorage.findShow.callCount).toBe(3)
  })
})
