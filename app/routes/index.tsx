import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useSnapshot } from "valtio";
import { Home } from "~/pages/home";
import Welcome from "~/pages/welcome";
import { useAuth } from "~/state/auth";
import { serverSideAPI } from "~/utils/api";


export const meta: MetaFunction<typeof loader> = ({data}) => {
  return {
    title: data.SITE_NAME || 'Ayuskey Fluorite',
  }
}

export async function loader() {
  const meta = await serverSideAPI.request('meta')
	return json({ SITE_NAME: process.env.SITE_NAME, meta });
};

export default function Index() {
	const { account } = useSnapshot(useAuth);
	if (!account) {
		return <Welcome />;
	}

	return <Home />;
}
