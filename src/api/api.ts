import { apiUrl } from '../config'
import { auth } from '../utils/auth.util'
import { HistoryResponse } from './responses'

export const apiClient = {
  getHistory(): Promise<HistoryResponse[]> {
    return auth.getIdToken().then(token =>
      fetch(apiUrl + 'history', {
        headers: { Authorization: 'bearer ' + token }
      }).then(result => {
        if (result.ok) {
          return result.json()
        }
        return Promise.reject(new Error('no :('))
      })
    )
  }
}
