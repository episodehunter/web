const cfUrl = 'https://d1lolx4ilifvdr.cloudfront.net'

export const images = {
  poster: {
    small: (tvdbId: number) => `${cfUrl}/poster/185x273/${tvdbId}.jpg`
  },
  fanart: {
    big: (tvdbId: number) => `${cfUrl}/fanart/${tvdbId}.jpg`
  }
}
