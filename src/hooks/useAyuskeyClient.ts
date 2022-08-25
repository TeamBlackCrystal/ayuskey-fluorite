import { api } from "ayuskey.js";
import { useMemo } from "react";
import { useAuth, useLocalStorage } from "../store/auth";
import { useSnapshot } from "valtio";

type AyuskeyApiOption = {
	origin: api.APIClient["origin"];
	credential?: api.APIClient["credential"];
};

export const useAyuskeyClient = (options?: AyuskeyApiOption) => {
	const storage = useLocalStorage;
	const { data: account } = useSnapshot(useAuth);
	const opts = {
		credential: options?.credential ? options.credential : account?.token,
		origin: options?.origin ? options.origin : `${storage.host}`,
	};
	const client = useMemo(() => new api.APIClient(opts), [
		opts.origin,
		opts.credential,
	]);
	return client;
};
