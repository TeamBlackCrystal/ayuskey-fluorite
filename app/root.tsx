import Banner from "@atlaskit/banner";
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
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
import { ClientOnly } from "remix-utils";
import mainStyle from "./assets/css/main.css";
import { Loading } from "./components/Loading";
import { useStreaming } from "./hooks/useStream.client";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { QueryClient, QueryClientProvider } from "react-query";
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";
import i18next from "./i18next.server";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: mainStyle },
		{
			rel: "preconnect",
			href: "https://fonts.googleapis.com",
		},
		{
			rel: "preconnect",
			href: "https://fonts.gstatic.com",
			crossOrigin: "anonymous",
		},
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=BIZ+UDGothic&family=Roboto:wght@100&display=swap",
		},
	];
};

export async function loader({ request }: LoaderArgs) {
	let locale = await i18next.getLocale(request);
	return json({
		INSTANCE_URL: process.env.INSTANCE_URL,
		PRODUCTION: process.env.NODE_ENV,
		locale,
	});
}
export const streamingContext = createContext<Stream | null>(null);
const queryClient = new QueryClient();

const AppInit = () => {
	const stream = useStreaming();
	return (
		<QueryClientProvider client={queryClient}>
			<streamingContext.Provider value={stream}>
				<Suspense fallback={<Loading />}><Outlet /></Suspense>
			</streamingContext.Provider>
		</QueryClientProvider>
	);
};

export default function App() {
	let data = useLoaderData<typeof loader>();

	let { i18n } = useTranslation();
	useChangeLanguage(data.locale);

	return (
		<html lang={data.locale} dir={i18n.dir()}>
			<head><Meta /><Links /></head>
			<body>
				{data.PRODUCTION !== "production" && (
					<Banner
						appearance="error"
						isOpen={true}
						icon={<ErrorIcon label="" secondaryColor="inherit" />}
					>
						このビルドは開発モードです
					</Banner>
				)}
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
