export class Show {
  title: string = 'TITLE'
}

export class ShowStore {
  shows: Show[] = []

  constructor() {
    this.shows = Array(23).fill({ title: '' })
  }
}
