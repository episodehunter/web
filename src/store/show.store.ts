export class Show {
  title: string = 'TITLE'
}

export class ShowStore {
  shows: Show[] = []

  constructor() {
    this.shows = Array(6).fill({ title: '' })
  }
}
