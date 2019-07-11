import { captureException } from '@sentry/browser'
import { useEffect, useState } from 'react'
import { useGqClient } from '../../global-context'
import { History } from '../../types/history'
import { fetchHistory } from './fetch-history'
import { format } from '../../utils/date.utils'

export function useHistory() {
  const client = useGqClient()
  const [history, setHistory] = useState<[string, History[]][]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchHistory(client, 0)
      .then(result => setHistory(groupedHistory(result)))
      .catch(err => {
        captureException(err)
        setHasError(true)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return [history, isLoading, hasError] as const
}

function groupedHistory(historyList: History[]) {
  const historyGroup = new Map<string, History[]>()
  for (let history of historyList) {
    const dateString = format(new Date(history.watchedEpisode.time * 1000), 'dddd, MMM D YYYY')
    const existingGroup = historyGroup.get(dateString)
    if (!existingGroup) {
      historyGroup.set(dateString, [history])
    } else {
      existingGroup.push(history)
    }
  }
  return Array.from(historyGroup.entries())
}
