import {apiClient}  from "strictcat"
import { Schema } from "../models/api";
import { kinds } from "../models/permission";

const apiType = apiClient<Schema>("")

export const createMisskeyApp = async (api: typeof apiType) => {
  return await api.call(
    "POST",
    "/api/app/create",
    {},
    {
      callbackUrl: `${import.meta.env.VITE_FRONT_DOMAIN}/cb`,
      description: "test",
      name: "Ayuskey Fluorite",
      permission: kinds,
    },
  );
}

export const createMisskeySession = async (props: {api: typeof apiType, secret: string}) => {
  const {api, secret} = {...props}
  return await api.call(
    "POST",
    "/api/auth/session/generate",
    {},
    { appSecret: secret },
  );
}
