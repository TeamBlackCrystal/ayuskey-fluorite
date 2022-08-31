import Banner from "@atlaskit/banner";
import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import type { Stream } from "ayuskey.js";
import { createContext, Suspense } from "react";
import { ClientOnly, json } from "remix-utils";
import mainStyle from "./assets/css/main.css";
import { Loading } from "./components/Loading";
import { useStreaming } from "./hooks/useStream.client";
import ErrorIcon from '@atlaskit/icon/glyph/error';

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: mainStyle }];
};

export const streamingContext = createContext<Stream | null>(null);

export const loader: LoaderFunction = () => {
	return json({ INSTANCE_URL: process.env.INSTANCE_URL, PRODUCTION: process.env.NODE_ENV });
};

const AppInit = () => {
	const stream = useStreaming();
	return (
		<streamingContext.Provider value={stream}>
			<Suspense fallback={<Loading />}><Outlet /></Suspense>
		</streamingContext.Provider>
	);
};

export default function App() {
	const data = useLoaderData();
	return (
		<html lang="en">
			<head><Meta /><Links /></head>
			<body>
                {data.PRODUCTION  !== 'PRODUCTION' && <Banner appearance="error" isOpen={true} icon={<ErrorIcon label="" secondaryColor="inherit" />}>このビルドは開発モードです</Banner>}
				<ClientOnly>{() => <AppInit />}</ClientOnly>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data)}`,
					}}
				/>
			</body>
		</html>
	);
}
