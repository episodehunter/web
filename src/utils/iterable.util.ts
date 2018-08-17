export function filter<T>(predicate: (el: T) => boolean) {
  return function*(arr: IterableIterator<T> | T[]) {
    for (let el of arr) {
      if (predicate(el)) {
        yield el
      }
    }
  }
}

export function reduce<T>(acc: (prev: T, curr: T, index: number) => T) {
  return function(arr: IterableIterator<T> | T[]): T {
    let prev: any = undefined
    let i = 0
    for (let el of arr) {
      if (i === 0) {
        prev = el
        i = i + 1
        continue
      }
      prev = acc(prev, el, i)
      i = i + 1
    }
    return prev
  }
}

export function exist<T>(predicate: (el: T) => boolean) {
  return function(arr: IterableIterator<T> | T[]): boolean {
    const { done } = filter(predicate)(arr).next()
    return !done
  }
}

export function findBest<T>(
  predicate: (prev: T, curr: T, index: number) => boolean
) {
  return reduce<T>(
    (prev, curr, index) => (predicate(prev, curr, index) ? curr : prev)
  )
}
