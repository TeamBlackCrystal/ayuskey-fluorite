import { Stream } from "ayuskey.js";
import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";
import { createContext, lazy, Suspense } from "react";
import { Loading } from "./components/Loading";
import { useStreaming } from "./hooks/webSocket";
import { theme } from "./theme";
import './assets/css/common.css'
const Router = lazy(() => import('./Route'));
export const streamingContext = createContext<Stream | null>(null);

export const App = () => {
	const stream = useStreaming();
	console.log("App");
	return (
		<streamingContext.Provider value={stream}>
			<SnackbarProvider maxSnack={3}>
					<div style={{ backgroundColor: theme.props.bg }}>
						<Suspense fallback={<Loading />}><Router /></Suspense>
					</div>
			</SnackbarProvider>
		</streamingContext.Provider>
	);
};
