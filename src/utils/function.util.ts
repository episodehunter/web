export const memorize = fn => {
  let beenCalled = false
  let result
  return (...args) => {
    if (beenCalled) {
      return result
    }
    result = fn(...args)
    beenCalled = true
    return result
  }
}
