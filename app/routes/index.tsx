import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { json } from "remix-utils";
import { useSnapshot } from "valtio";
import Welcome from "~/pages/welcome";
import { useAuth } from "~/state/auth";

export const loader: LoaderFunction = () => {
	return json({ FRONT_URL: process.env.FRONT_URL });
};

export default function Index() {
	const { account } = useSnapshot(useAuth);
	useEffect(() => {
		// addAccount({id: "w", "token": "NOZYFIB0sewHIpZi"})
		// setUser({email: 'unko', name: 'aa'})
	}, []);
    if (!account) {
		return <Welcome />;
	}

	return (
        <Welcome />
	);
}
