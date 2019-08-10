export const memorize = <T extends any[], R>(fn: (...args: T) => R) => {
  let beenCalled = false
  let result: R
  return (...args: T) => {
    if (beenCalled) {
      return result
    }
    result = fn(...args)
    beenCalled = true
    return result
  }
}
