import { spy } from 'simple-spy'
import { composeNull } from '../function.util'

test('Compose functions', () => {
  // Arrange
  const f1 = (a: number) => a.toString()
  function f2(a: string) {
    return a + 1
  }

  // Act
  const result = composeNull(f2, f1)(1)

  // Assert
  expect(result).toBe('11')
})

test('Return null if the first function returns null', () => {
  // Arrange
  const f1 = (a: string) => a.toUpperCase()
  const f2 = () => null
  const f3 = spy((a: string) => a.toUpperCase())

  // Act
  const result = composeNull(f3 as any, f2, f1)('Hej')

  // Assert
  expect(result).toBe(null)
  expect(f3.callCount).toBe(0)
})

test('Return null if the argument is null', () => {
  // Arrange
  const f1 = (a: string) => a.toUpperCase()

  // Act
  const result = composeNull(f1)(null)

  // Assert
  expect(result).toBe(null)
})

test('Return null if the argument is null', () => {
  // Arrange
  const f = (a: string) => a.toUpperCase()

  // Act
  const result = composeNull(f, f)(null)

  // Assert
  expect(result).toBe(null)
})
