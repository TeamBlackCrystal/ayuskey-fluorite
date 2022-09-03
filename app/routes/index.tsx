import type { LoaderFunction } from "@remix-run/node";
import { json } from "remix-utils";
import { useSnapshot } from "valtio";
import { Home } from "~/pages/home";
import Welcome from "~/pages/welcome";
import { useAuth } from "~/state/auth";

export const loader: LoaderFunction = () => {
	return json({ FRONT_URL: process.env.FRONT_URL });
};

export default function Index() {
	const { account } = useSnapshot(useAuth);
	if (!account) {
		return <Welcome />;
	}

	return <Home />;
}
