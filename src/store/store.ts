import { useStrict } from 'mobx'
import { MovieStore } from './movie.store'

useStrict(true)

class Store {
  movieStore = new MovieStore()
}

export const store = new Store()
