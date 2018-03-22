export function gql(strings: any, ...keys: any[]): string {
  const lastIndex = strings.length - 1
  return (
    strings
      .slice(0, lastIndex)
      .reduce((p: any, s: any, i: any) => p + s + keys[i], '') +
    strings[lastIndex]
  )
}

export const followingQuery = `{
	following {
		id
	}
}`

export const showQuery = gql`
  query getShow($id: Int!) {
    show(id: $id) {
      id
      name
      tvdbId
      overview
      genre
      language
      network
      runtime
      ended
      imdbId
      firstAired
      airsDayOfWeek
      airsTime
      episodes {
        name
        tvdbId
        firstAired
        season
      }
    }
  }
`
