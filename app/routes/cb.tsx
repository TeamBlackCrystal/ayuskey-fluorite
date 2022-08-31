import type { LoaderFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import { AyuskeyClient } from "~/hooks/useAyuskeyClient";
import { getLocalStorage, removeLocalStorage } from "~/utils/storage.client";
import { SHA256 } from "crypto-js";
import { db } from "~/state/db";
import { useAccount } from "~/state/account";
import { useLoaderData } from "@remix-run/react";
import type { UserDetailed } from "ayuskey.js/built/entities";
import { useEffect } from "react";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

async function getLoaderData(request: Request) {
	const url = new URL(request.url);
	const token = url.searchParams.get("token");
	return { token };
}

export const loader: LoaderFunction = async ({ request }) => {
	const res = await getLoaderData(request);
	return json(res);
};

const Callback = () => {
	const data = useLoaderData<LoaderData>();
	const api = AyuskeyClient();

	useEffect(() => {
		(async () => {
			const appSecret = getLocalStorage("__token", null);
			if (appSecret && data.token) {
				const res = await api.request("auth/session/userkey", {
					appSecret: appSecret,
					token: data.token,
				});
				const user = res.user as UserDetailed;
				const accessToken = SHA256(res.accessToken + appSecret).toString();
				await db.accounts.add({ id: res.user.id, token: accessToken });
				useAccount.setAccount(user);
				removeLocalStorage("__token");
			}
			return window.location.href = "/";
		})();
	}, []);
};

export default Callback;
