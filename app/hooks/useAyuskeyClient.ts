import { api } from "ayuskey.js";
import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { useAuth } from "~/state/auth";
import { useCommon } from "~/state/common";

type AyuskeyApiOption = {
	origin: api.APIClient["origin"];
	credential?: api.APIClient["credential"];
};

export const AyuskeyClient = (options?: AyuskeyApiOption) => {
    const {account} = useSnapshot(useAuth)
    const { host } = useSnapshot(useCommon);
	const opts = {
		credential: options?.credential ? options.credential : account?.token,
		origin: options?.origin ? options.origin : String(host),
	};
	const client = useMemo(() => new api.APIClient(opts), [
		opts.origin,
		opts.credential,
	]);
	return client;
};

