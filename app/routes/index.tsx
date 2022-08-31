import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { json } from "remix-utils";
import { useSnapshot } from "valtio";
import Welcome from "~/pages/welcome";
import { useAuth } from "~/state/auth";

export const loader: LoaderFunction = ({request}) => {

    return json({FRONT_URL: process.env.FRONT_URL})
}

export default function Index() {
    const data = useLoaderData<{a: boolean}>()
    console.log(data)
	const accounts = useSnapshot(useAuth);
    console.log(accounts.account, 'valtio')
	useEffect(() => {
		// addAccount({id: "w", "token": "NOZYFIB0sewHIpZi"})
		// setUser({email: 'unko', name: 'aa'})
	}, []);

    if (!accounts) {
        return <Welcome />
    }

	return (
        <Welcome />
	);
}
