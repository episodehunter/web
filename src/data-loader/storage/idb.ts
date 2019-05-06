import { get, set } from 'idb-keyval'

export interface Idb {
  get: typeof get
  set: typeof set
  createStorageObject<T>(value: T): StorageObject<T>
}

export interface StorageObject<T> {
  value: T
  storageDate: Date
  isValid: boolean
}

export function createIdb(): Idb {
  const createStorageObject = <T>(value: T): StorageObject<T> => {
    return {
      value,
      storageDate: new Date(),
      isValid: true
    }
  }
  return {
    set,
    get,
    createStorageObject
  }
}
