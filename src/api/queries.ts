export const followingQuery = `{
	following {
		id,
		tvdbId,
		name,
		episodes {
            name
		}
	}
}`
