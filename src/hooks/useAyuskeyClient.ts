import { api } from "@ayuskey/misskey.js";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../store/auth";
import { TAccount } from "../store/db";
import { useLogin } from "./useLogin";
import { useAsync } from "react-async"

type AyuskeyApiOption = {
	origin: api.APIClient["origin"];
	credential?: api.APIClient["credential"];
};

export const useAyuskeyClient = (options?: AyuskeyApiOption) => {
  const storage = useLocalStorage.getState()
  const login = useAsync({promiseFn: useLogin})
  const opts = {
		credential: options?.credential ? options.credential : login.data?.token,
		origin: options?.origin ? options.origin : `${storage.host}`,
	};
	const client = useMemo(() => new api.APIClient(opts), [
		opts.origin,
		opts.credential,
	]);
	return client;
};
