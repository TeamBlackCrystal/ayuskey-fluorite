import { createContext, ReactNode, useContext, useEffect } from "react";

export const WebSocketContext = createContext<IContextValue>(
	{} as IContextValue,
);
export const useWebSocketContext = () => useContext(WebSocketContext);

interface Props {
	children: ReactNode;
}

interface IContextValue {
	session: WebSocket;
}

export const WebSocketContextProvider: React.FC<Props> = ({ children }) => {
	useEffect(() => {}, []);

	const contextValue: IContextValue = {
		session: new WebSocket(
			`wss://${import.meta.env.VITE_INSTANCE_DOMAIN}/streaming`,
		),
	};

	return (
		<WebSocketContext.Provider value={contextValue}>
			{children}
		</WebSocketContext.Provider>
	);
};
