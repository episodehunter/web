export const followingQuery = `{
	following {
		id,
		tvdbId,
		name,
		overview,
		genre,
		language,
		network,
		runtime,
		ended,
		imdbId,
		firstAired,
		airsDayOfWeek,
		airsTime,
		episodes {
			name,
			tvdbId,
			firstAired,
			season
		}
	}
}`
