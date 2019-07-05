import {
  addDays,
  differenceInCalendarDays,
  distanceInWords,
  format as fromatDate,
  isAfter,
  isBefore,
  isValid as isValidDate,
  parse,
  startOfToday
} from 'date-fns'

export const yyyymmdd = (date: Date) => date.toISOString().slice(0, 10)
export const time = (date: Date) => format(date, 'HH:mm')

export const isValid = (date: Date | null): date is Date => Boolean(date && isValidDate(date))

export const format = (date: Date | null, dateFormat: string) =>
  isValid(date) ? fromatDate(date, dateFormat) : ''

export const formatFromString = (dateString?: string | null, dateFormat?: string) => {
  if (typeof dateString !== 'string') {
    return ''
  }
  const date = parse(dateString)
  return isValid(date) ? fromatDate(date, dateFormat) : ''
}

export const ddmmm = (date: Date): string => format(date, 'D MMMM').toUpperCase()

export const now = () => new Date()
export type Now = typeof now
export const unixtimestamp = () => (Date.now() / 1000) | 0

export const today = () => startOfToday()
export type Today = typeof today

export const daysFrom = (days: number, from: Date) => addDays(from, days)

export const isSameDayOrAfter = (date: Date, dateToCompare: Date) =>
  isAfter(date, addDays(dateToCompare, -1))

export const isBeforeDaysFrom = (days: number, from: Date) => {
  const daysFromNow = daysFrom(days, from)
  return (date: Date) => isBefore(date, daysFromNow)
}
export const isAfterDaysFrom = (days: number, from: Date) => {
  const daysFromNow = daysFrom(days, from)
  return (date: Date) => isAfter(date, daysFromNow)
}

export const dateReleaseFormat = (
  dateString: string | Date | null,
  options?: {
    future?: (date: string) => string
    past?: (date: string) => string
  },
  _today = today()
): string => {
  if (!dateString) {
    return ''
  }
  const date = parse(dateString)
  if (!isValid(date)) {
    return ''
  }
  const diff = differenceInCalendarDays(date, _today)
  const pass = (options && options.past) || (v => v)
  const future = (options && options.future) || (v => v)
  const fun = diff >= 0 ? future : pass

  if (diff === 0) {
    return fun('today 🎉')
  } else if (Math.abs(diff) < 7) {
    return fun(distanceInWords(_today, date, { addSuffix: true }) + ' 🎉')
  } else {
    return fun(format(date, 'Do MMM YYYY'))
  }
}
