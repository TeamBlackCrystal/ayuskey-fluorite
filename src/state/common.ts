import { proxy } from "valtio";
import { getLocalStorage } from "../utils/storage";

interface ICommon {
    name: boolean
    host: string | null
}

export const useCommon = proxy<ICommon>({
    name: getLocalStorage('a', true),
    host: import.meta.env.VITE_INSTANCE_DOMAIN || null
})
