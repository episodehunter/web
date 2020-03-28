const cfUrl = 'https://d1lolx4ilifvdr.cloudfront.net'

export const images = {
  poster: {
    small: (tvdbId: number | string) => `${cfUrl}/poster/185x273/${tvdbId}.jpg`,
  },
  fanart: {
    big: (tvdbId: number | string) => `${cfUrl}/fanart/${tvdbId}.jpg`,
  },
  episode: {
    small: (tvdbId: number | string) => `${cfUrl}/episode/${tvdbId}.jpg`,
  },
}
