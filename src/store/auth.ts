import { UserDetailed } from "ayuskey.js/built/entities";
import { useLogin } from "../hooks/useLogin";
import { proxy } from "valtio";

type TLocalStorage = {
	host: string;
	account: UserDetailed | null;
	setAccount: (user: UserDetailed) => void;
};

export const getLocalStorage = <T>(
	key: string,
	defaultValue: T,
	json: boolean = false,
): T => {
  const keys = key.split('/')
  let item = null
  if (keys.length === 1) item = window.localStorage.getItem(key)
  if (keys.length > 1) {
    const original = window.localStorage.getItem(keys[0])
    if (!original) {
      return defaultValue
    }
    item = JSON.parse(original)[keys[1]]
  }
	return item ? (
		json ? JSON.parse(item) : item
	) : defaultValue;
};

export const removeLocalStorage = (key: string): void => {
	window.localStorage.removeItem(key);
};

export const setLocalStorage = (key: string, value: object | string): void => {
	const _value = typeof value === "object" ? JSON.stringify(value) : value;
	window.localStorage.setItem(key, _value);
};

export const useAuth = proxy({ data: useLogin().then((res) => res) });
export const useLocalStorage = proxy<TLocalStorage>({
	host: import.meta.env.VITE_INSTANCE_DOMAIN,
	account: getLocalStorage<null | UserDetailed>("_account", null, true),
	setAccount: (user: UserDetailed) => {
		setLocalStorage("_account", user);
	},
});
