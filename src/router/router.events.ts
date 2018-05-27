export class RouterEvents {
  listeners = {}

  dispatch(event, data) {
    const eventCallbacks = this.listeners[event]
    if (!Array.isArray(eventCallbacks)) return

    eventCallbacks.forEach(callback => callback(data))
  }

  addListener(event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)
  }

  removeListener(event, callback) {
    const eventCallbacks = this.listeners[event]
    if (!Array.isArray(eventCallbacks)) return

    const callbackIndex = eventCallbacks.indexOf(callback)
    if (callbackIndex > -1) {
      eventCallbacks.splice(callbackIndex, 1)
    }
  }
}
