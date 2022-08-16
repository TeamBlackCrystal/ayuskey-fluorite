import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

// import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { useWebSocketContext, WebSocketContextProvider } from "./contexts/webSocket";

const queryClient = new QueryClient();

const App = () => {
    const session = useWebSocketContext()
    return (<></>) 
}



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
            <WebSocketContextProvider>
			<ChakraProvider><App /></ChakraProvider>
            </WebSocketContextProvider>
            <ReactQueryDevtools />
            
		</QueryClientProvider>
	</StrictMode>,
);
