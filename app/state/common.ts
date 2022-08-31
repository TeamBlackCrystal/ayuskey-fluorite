import { proxy } from "valtio";
import { isBrowser } from "~/const";
import { getLocalStorage } from "~/utils/storage.client";

interface ICommon {
    name: boolean
    host: string | null
}

export const useCommon = proxy<ICommon>({
    name: isBrowser ? getLocalStorage('a', true) : false,
    host: isBrowser ? null : process.env.INSTANCE_URL || null
})