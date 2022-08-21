import { Stream } from "@ayuskey/misskey.js";
import { NextUIProvider } from "@nextui-org/react";
import { createContext } from "react";
import { useStreaming } from "./hooks/webSocket";
import { Router } from "./Route";

export const streamingContext = createContext<Stream | null>(null);

export const App = () => {
	const stream = useStreaming();

	return (
		<streamingContext.Provider value={stream}>
			<NextUIProvider>
				<div style={{ width: "100vw", height: "100vh" }}><Router /></div>
			</NextUIProvider>
		</streamingContext.Provider>
	);
};
