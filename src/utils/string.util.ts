export function safeStringConvertion(obj: any) {
  if (obj === undefined || obj === null) {
    return ''
  }
  return String(obj)
}

export function safeUpperCase(str?: string) {
  if (str && str.toUpperCase) {
    return str.toUpperCase()
  }
  return ''
}
