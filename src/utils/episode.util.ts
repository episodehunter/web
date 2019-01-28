export function numberOfUnwatchedHoursLeft(
  episodesToWatch: number,
  runtime: number
) {
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
  return (
    'S' +
    String(season).padStart(2, '0') +
    'E' +
    String(episode).padStart(2, '0')
  )
}
