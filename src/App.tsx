import { Stream } from "ayuskey.js";
import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";
import { createContext, lazy, Suspense } from "react";
import { Loading } from "./components/Loading";
import { useStreaming } from "./hooks/webSocket";
const Router = lazy(() => import('./Route'));
export const streamingContext = createContext<Stream | null>(null);

export const App = () => {
	const stream = useStreaming();
	console.log("App");
	return (
		<streamingContext.Provider value={stream}>
			<SnackbarProvider maxSnack={3}>
				<NextUIProvider>
					<div style={{ width: "100vw", height: "100vh" }}>
						<Suspense fallback={<Loading />}><Router /></Suspense>
					</div>
				</NextUIProvider>
			</SnackbarProvider>
		</streamingContext.Provider>
	);
};
