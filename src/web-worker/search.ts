import Fuse, { FuseOptions } from 'fuse.js';

type Title = {
  id: string
  followers: number
  name: string
  tvdbId: number
}

enum FetchStatus {
  NotStarted,
  Started,
  Completed
}

const fuseOptions: FuseOptions = {
  keys: ['name'],
  maxPatternLength: 32,
  minMatchCharLength: 2,
  threshold: 0.6,
  distance: 100,
  includeScore: true
}

const returnData = (data: any) => {
  (self.postMessage as any)(data)
}

let fetchStatus = FetchStatus.Started;

const fuseP: Promise<Fuse> = fetch('https://us-central1-newagent-dc3d1.cloudfunctions.net/fn/titles')
  .then(result => {
    fetchStatus = FetchStatus.Completed;
    return result.json()
  })
  .then(titles => new Fuse(titles, fuseOptions));

function search(fuse: Fuse, searchWord: string) {
  return fuse.search<{ item: Title, score: number }>(searchWord)
    .map(searchResult => {
      searchResult.score = (1 - searchResult.score) * searchResult.item.followers
      return searchResult;
    })
    .sort((a, b) => b.score - a.score)
    .map(a => a.item);
}

let currectSearchWord = '';

self.addEventListener('message', async event => {
  if (fetchStatus === FetchStatus.Started) {
    returnData({
      fetchStatus: FetchStatus[fetchStatus],
      result: []
    });
  }

  currectSearchWord = event.data;

  const fuse = await fuseP;
  if (currectSearchWord) {
    const result = search(fuse, currectSearchWord);
    returnData({
      fetchStatus: FetchStatus[fetchStatus],
      result: result
    });
    currectSearchWord = '';
  }
})
