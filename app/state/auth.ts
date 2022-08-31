import { isBrowser } from "~/const";
import { getLogin } from "~/middlewares/auth.client";
import { proxy } from "valtio";

export const useAuth = proxy({
	account: isBrowser ? getLogin().then((res) => res) : null,
});

