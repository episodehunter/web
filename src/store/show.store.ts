export class Show {
  id: number = 0
  src: string = ''
}

export class ShowStore {
  shows: Show[] = []

  constructor() {
    this.shows = [
      {
        id: 0,
        src: 'https://d1lolx4ilifvdr.cloudfront.net/poster/185x273/260449.jpg'
      },
      {
        id: 1,
        src: 'https://d1lolx4ilifvdr.cloudfront.net/poster/185x273/80379.jpg'
      },
      {
        id: 2,
        src: 'https://d1lolx4ilifvdr.cloudfront.net/poster/185x273/78804.jpg'
      },
      {
        id: 3,
        src: 'https://d1lolx4ilifvdr.cloudfront.net/poster/185x273/175001.jpg'
      },
      {
        id: 4,
        src: 'https://d1lolx4ilifvdr.cloudfront.net/poster/185x273/153021.jpg'
      },
      {
        id: 5,
        src: 'https://d1lolx4ilifvdr.cloudfront.net/poster/185x273/72449.jpg'
      },
      {
        id: 6,
        src: 'https://d1lolx4ilifvdr.cloudfront.net/poster/185x273/247897.jpg'
      },
      {
        id: 7,
        src: 'https://d1lolx4ilifvdr.cloudfront.net/poster/185x273/328724.jpg'
      },
      {
        id: 8,
        src: 'https://d1lolx4ilifvdr.cloudfront.net/poster/185x273/270915.jpg'
      }
    ]
  }
}
