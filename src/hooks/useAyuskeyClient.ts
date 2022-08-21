import { api } from "@ayuskey/misskey.js";
import { useMemo } from "react";
import { useLocalStorage } from "../store/auth";

type AyuskeyApiOption = {
  origin: api.APIClient['origin'];
  credential?: api.APIClient['credential'];
};


export const useAyuskeyClient = (options?: AyuskeyApiOption) => {
  const {host, i} = useLocalStorage.getState()
  const opts = {
    credential: options?.credential ? options.credential : i,
    origin: options?.origin ? options.origin : `https://${host}`
  }
  const client = useMemo(() => new api.APIClient(opts), [opts.origin, opts.credential])
  return client
}
