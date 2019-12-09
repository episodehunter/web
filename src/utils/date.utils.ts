import {
  addDays,
  differenceInCalendarDays,
  formatRelative,
  format as fromatDate,
  isBefore,
  isValid as isValidDate,
  parseISO,
  startOfToday
} from 'date-fns'

export const time = (date: Date) => format(date, 'HH:mm')

const isValid = (date: Date | null): date is Date => Boolean(date && isValidDate(date))

export const format = (date: Date, dateFormat: string) =>
  isValid(date) ? fromatDate(date, dateFormat) : ''

export const parse = parseISO
export const today = startOfToday

export const now = () => new Date()

export const daysFrom = (days: number, from: Date) => addDays(from, days)

export const isBeforeDaysFrom = (days: number, from: Date) => {
  const daysFromNow = daysFrom(days, from)
  return (date: Date) => isBefore(date, daysFromNow)
}

export const dateReleaseFormat = (
  date: Date,
  options?: {
    future?: (date: string) => string
    past?: (date: string) => string
  },
  _today = today()
): string => {
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
    return fun(formatRelative(date, _today, { weekStartsOn: 1 }) + ' 🎉')
  } else {
    return fun(format(date, 'do MMM yyyy'))
  }
}
