import { api as MisskeyAPI } from "ayuskey.js";

export const serverSideAPI = new MisskeyAPI.APIClient({origin: process.env.INSTANCE_URL || ''})
