import { ComponentClass } from 'react'

type Fun<A, R> = (a: A) => R
type FunOrNull<A, R> = Fun<A | null, R | null>
export function composeNull<R>(): (a: R) => R
export function composeNull<A1, R1>(fn1: Fun<A1, R1>): FunOrNull<A1, R1>
export function composeNull<A1, R1, R2>(
  fn2: Fun<R1, R2>,
  fn1: Fun<A1, R1>
): FunOrNull<A1, R2>
export function composeNull<A1, R1, R2, R3>(
  fn3: Fun<R2, R3>,
  fn2: Fun<R1, R2>,
  fn1: Fun<A1, R1>
): FunOrNull<A1, R3>

export function composeNull<T>(...ops: Fun<T, T>[]) {
  return arg => {
    let result = arg
    for (let op of ops.reverse()) {
      if (result === null) {
        return null
      }
      result = op(result)
    }
    return result
  }
}

export const composeHOC = <P>(
  ...hocs
): ((
  comp: ((props: P) => JSX.Element) | ComponentClass<P>
) => ComponentClass<P>) => hocs.reduceRight((a, b) => arg => b(a(arg)))

export const args2 = <A1, A2, R>(fn: (a: A1, b: A2) => R) => (a: A1, b: A2) =>
  fn(a, b)
