import { addDays, format, isAfter, isBefore, startOfToday } from 'date-fns'

export const yyyymmdd = (date: Date) => date.toISOString().slice(0, 10)

export const ddmmm = (date: Date): string =>
  format(date, 'D MMMM').toUpperCase()

export const now = () => new Date()
export type Now = typeof now

export const today = () => startOfToday()
export type Today = typeof today

export const daysFrom = (days: number, from: Date) => addDays(from, days)

export const isSameDayOrAfter = (date: Date, dateToCompare: Now) =>
  isAfter(date, addDays(dateToCompare(), -1))

export const isBeforeDaysFrom = (days: number, from: Date) => {
  const daysFromNow = daysFrom(days, from)
  return (date: Date) => isBefore(date, daysFromNow)
}
export const isAfterDaysFrom = (days: number, from: Date) => {
  const daysFromNow = daysFrom(days, from)
  return (date: Date) => isAfter(date, daysFromNow)
}
