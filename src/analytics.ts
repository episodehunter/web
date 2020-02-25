export function pageview(url: string) {
  window.navigator.sendBeacon(
    'https://ncgtpliylg.execute-api.us-east-1.amazonaws.com/prod/hugin',
    JSON.stringify({ type: 'pageview', cid: '555', url })
  )
}
