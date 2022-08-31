import type { APIClient } from "ayuskey.js/built/api";
import { kinds } from "../models/permission";


export const createMisskeyApp = async (api: APIClient, callbackUrl: string) => {
    return api.request('app/create', {
        callbackUrl: callbackUrl,
        description: "test",
        name: "Ayuskey Fluorite",
        permission: kinds,
    })

}

export const createMisskeySession = async (props: {api: APIClient, secret: string}) => {
  const {api, secret} = {...props}
  return await api.request('auth/session/generate', {appSecret: secret})
}
