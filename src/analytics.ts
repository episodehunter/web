let cid = 0

export function pageview(url: string) {
  if (!cid) {
    cid = (Math.random() * 100000) | 0
  }
  window.navigator.sendBeacon(
    'https://ncgtpliylg.execute-api.us-east-1.amazonaws.com/prod/hugin',
    JSON.stringify({ type: 'pageview', cid, url })
  )
}
