const months = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER'
]

export const yyyymmdd = (date: Date) => date.toISOString().slice(0, 10)

export const ddmmm = (date: Date): string =>
  date.getDate() + ' ' + months[date.getMonth()]
