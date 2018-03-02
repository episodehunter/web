class Movie {
  title: string = 'TITLE'
}

export class MovieStore {
  movies: Movie[] = []

  constructor() {
    this.movies = [{ title: 'Game of Jannes' }]
  }
}
