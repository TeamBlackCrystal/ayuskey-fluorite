import type { UserDetailed } from "ayuskey.js/built/entities";
import { proxy } from "valtio";
import { isBrowser } from "~/const";
import { getLocalStorage, setLocalStorage } from "~/utils/storage.client";

type TAccount = {
	account: UserDetailed | null;
	setAccount: (user: UserDetailed) => void;
};

export const useAccount =  proxy<TAccount>({
    account: isBrowser ? getLocalStorage('_account', null) : null,
    setAccount: (user: UserDetailed) => {
		setLocalStorage("_account", user);
	},
})