import create from "zustand"

type TAuth = {
  i: string | null
  host: string
  setHost: (newHost: string) => void
}

const getLocalStorage = <T> (key:string, defaultValue: T): string | T => {
  const item  = window.localStorage.getItem(key)
  return typeof item === 'string' ? item : defaultValue

}
const setLocalStorage = (key:string, value: object | string): void => {
  const _value = typeof value === "object" ? JSON.stringify(value) : value
  window.localStorage.setItem(key, _value)
}

export const useLocalStorage = create<TAuth>((set)=> ({
  i: getLocalStorage<null>("i", null),
  host: getLocalStorage<string>("host", "kr.akirin.xyz"),
  setHost(newHost: string) {
      set((state) => {
        setLocalStorage('host', newHost)
        return {host: newHost}
      })
  },
}))
