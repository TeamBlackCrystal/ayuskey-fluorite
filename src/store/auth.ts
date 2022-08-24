import { UserDetailed } from "@ayuskey/misskey.js/built/entities";
import create from "zustand";
import { useLogin } from "../hooks/useLogin";
import { getAccount } from "../middlewares/auth";
import { TAccount } from "./db";

type TAuth = {
  host: string
	account: UserDetailed | null;
	add: (key: string, value: object | string) => void;
  setAccount: (user: UserDetailed) => void;
};

export const getLocalStorage = <T>(
	key: string,
	defaultValue: T,
	json: boolean = false,
): T => {
	const item = window.localStorage.getItem(key);
	return typeof item === "string" ? (
		json ? JSON.parse(item) : item
	) : defaultValue;
};

export const removeLocalStorage = (key: string): void => {
	window.localStorage.removeItem(key);
};

const setLocalStorage = (key: string, value: object | string): void => {
	const _value = typeof value === "object" ? JSON.stringify(value) : value;
	window.localStorage.setItem(key, _value);
};

export const useLocalStorage = create<TAuth>(
	(set) => ({
    host: import.meta.env.VITE_INSTANCE_DOMAIN,
		account: getLocalStorage<null | UserDetailed>(
			"_account",
			null,
			true,
		),
    add(key, value) {
        set(() => {
          setLocalStorage(key, value)
          return {}
        })
    },
    setAccount(user: UserDetailed) {
      set(() => {
        setLocalStorage("_account", user)
        return {account: user}
      })
    }
  }))
