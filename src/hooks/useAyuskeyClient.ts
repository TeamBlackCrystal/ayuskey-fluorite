import { api } from "@ayuskey/misskey.js";
import { useMemo } from "react";
import { useLocalStorage } from "../store/auth";

type AyuskeyApiOption = {
  origin: api.APIClient['origin'];
  credential?: api.APIClient['credential'];
};


export const useAyuskeyClient = (options?: AyuskeyApiOption) => {
  const {mainAccount} = useLocalStorage.getState()
  if (!mainAccount) throw 'error'
  const opts = {
    credential: options?.credential ? options.credential : mainAccount.i,
    origin: options?.origin ? options.origin : `${mainAccount.host}`
  }
  const client = useMemo(() => new api.APIClient(opts), [opts.origin, opts.credential])
  return client
}
