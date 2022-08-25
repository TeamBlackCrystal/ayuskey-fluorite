import ReactDOM from "react-dom/client";

// import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { BrowserRouter } from "react-router-dom";

import { App } from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <StrictMode>
	<QueryClientProvider client={queryClient}>
		<BrowserRouter><App /></BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>,
// </StrictMode>,
);
