export function isArray(arr: any): arr is Array<any> {
  return arr && typeof arr.length === 'number'
}

export function safeJoin(arr: Array<any>, delimiter?: string) {
  if (isArray(arr)) {
    return arr.join(delimiter)
  }
  return ''
}
