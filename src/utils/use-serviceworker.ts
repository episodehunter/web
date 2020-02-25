import { useState, useEffect } from 'react'
import { config } from '../config'

export function useServiceWorker() {
  const [newSw, setNewSw] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    if (config.environment === 'development' || !navigator.serviceWorker) {
      return
    }

    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      // if there's no controller, this page wasn't loaded
      // via a service worker, so they're looking at the latest version.
      // In that case, exit early
      if (!navigator.serviceWorker.controller) {
        return
      }

      // if there's an updated worker already waiting, update
      if (registration.waiting) {
        setNewSw(registration.waiting)
        return
      }

      // if there's an updated worker installing, track its
      // progress. If it becomes "installed", update
      if (registration.installing) {
        registration.addEventListener('statechange', () => {
          if (registration.installing?.state == 'installed') {
            setNewSw(registration.installing)
          }
        })
        return
      }

      // otherwise, listen for new installing workers arriving.
      // If one arrives, track its progress.
      // If it becomes "installed", update
      registration.addEventListener('updatefound', () => {
        const newServiceWorker = registration.installing

        newServiceWorker?.addEventListener('statechange', () => {
          if (newServiceWorker.state == 'installed') {
            setNewSw(newServiceWorker)
          }
        })
      })
    })
  }, [])

  useEffect(() => {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  }, [])

  const showAppUpdateModal = Boolean(newSw)
  const updateServiceWorker = () => {
    newSw?.postMessage('skipWaiting')
  }
  const ignore = () => {
    setNewSw(null)
  }
  return [showAppUpdateModal, updateServiceWorker, ignore] as const
}
