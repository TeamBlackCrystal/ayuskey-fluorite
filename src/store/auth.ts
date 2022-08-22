import create from "zustand"

type TAuth = {
  setMainAccountHost: (newHost: string) => void
  mainAccount: {host: string, i: string} | null
  accounts: {host: string, i: string}[] | null
  setMainAccountI: (i: string) => void
  add: (key:string, value: object | string) => void
}

export const getLocalStorage = <T> (key:string, defaultValue: T, json: boolean = false): T => {
  const item  = window.localStorage.getItem(key)
  return typeof item === 'string' ? (json ? JSON.parse(item) : item) : defaultValue
}

export const removeLocalStorage = (key:string): void => {
  window.localStorage.removeItem(key)
}

const setLocalStorage = (key:string, value: object | string): void => {
  const _value = typeof value === "object" ? JSON.stringify(value) : value
  window.localStorage.setItem(key, _value)
}

export const useLocalStorage = create<TAuth>((set)=> ({
  mainAccount: getLocalStorage<null | {host: string, i: string}>("_mainAccount", null, true),
  accounts: getLocalStorage<null | {host: string, i: string}[]>("_accounts", null, true),
  setMainAccountHost(newHost: string) {
      set((state) => {
        setLocalStorage('_mainAccount', {host: newHost, i: state.mainAccount?.i || ''})
        return {mainAccount: {host: newHost, i: state.mainAccount?.i || ''}}
      })
  },
  add(key, value) {
      set(() => {
        setLocalStorage(key, value)
        return {}
      })
  },
  setMainAccountI(i) {
      set((state) => {
        if (!state.mainAccount?.host) throw 'error'
        setLocalStorage('_mainAccount', {host: state.mainAccount.host, i})
        return {mainAccount: {host: state.mainAccount.host, i}}
      })
  },
}))
