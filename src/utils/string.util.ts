export function safeStringConvertion(obj: any) {
  if (obj === undefined || obj === null) {
    return ''
  }
  return String(obj)
}
