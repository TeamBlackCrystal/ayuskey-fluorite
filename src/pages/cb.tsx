import { SHA256 } from "crypto-js";
import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "strictcat";
import { addAccount } from "../middlewares/auth";
import { Schema } from "../models/api";
import {
	getLocalStorage,
	removeLocalStorage,
	useLocalStorage,
} from "../store/auth";
import { db } from "../store/db";

const CallBack: FC = () => {
	const search = useLocation().search;
	const query = new URLSearchParams(search);
	const token = query.get("token");
	const secret = getLocalStorage("_auth_secret", null);

	const storage = useLocalStorage;
	removeLocalStorage("_auth_secret");

	useEffect(() => {
		if (!(secret && token)) {
			window.location.href = import.meta.env.VITE_CALLBACK_PATH;
		}

		if (secret && token) {
			apiClient<Schema>(`${storage.host}`)
				.call(
					"POST",
					"/api/auth/session/userkey",
					{},
					{ appSecret: secret, token: token },
				)
				.then(async (res) => {
					if (res.type === "failed") throw res.type, res.data;

					storage.setAccount(res.data.user);
					await db.accounts.add({
						token: SHA256(res.data.accessToken + secret).toString(),
						id: res.data.user.id,
					});
					window.location.href = import.meta.env.VITE_CALLBACK_PATH;
				});
		}
	}, []);

	return <div></div>;
};

export default CallBack
