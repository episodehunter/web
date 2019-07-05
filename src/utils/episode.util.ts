export function numberOfUnwatchedHoursLeft(episodesToWatch: number, runtime: number) {
  return Math.round((episodesToWatch * runtime) / 60)
}

export function numberOfEpisodesToWatchPercent(
  totalNumberOfEpisodes: number,
  numberOfWatchedEpisodes: number
) {
  if (totalNumberOfEpisodes === 0) {
    return 0
  }
  return Math.round((numberOfWatchedEpisodes * 100) / totalNumberOfEpisodes)
}

export function composeSeasonAndEpisodeNumber(season: number, episode: number) {
  return 'S' + String(season).padStart(2, '0') + 'E' + String(episode).padStart(2, '0')
}

export function extractSeasonNumber(episodenumber: number) {
  return (episodenumber / 10000) | 0
}

export function episodeNumberToString(episodeNumber: number) {
  const episode = String(Number(String(episodeNumber).substr(-4))).padStart(2, '0')
  const season = String(extractSeasonNumber(episodeNumber)).padStart(2, '0')

  return `S${season}E${episode}`
}

export function calculateEpisodeNumber(season: number, episode: number) {
  return season * 10000 + episode
}
