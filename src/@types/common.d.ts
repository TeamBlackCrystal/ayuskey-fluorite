interface IWebSocketPayload<T> {
	type: string;
	body: IWebSocketBodyPayload<T>;
}

interface IWebSocketBodyPayload<T> {
	id: string | number;
	type: string;
	body: T;
}

interface IOGP {
	description: string;
	icon: string;
	player: { url?: any; width?: any; height?: any };
	sensitive: boolean;
	sitename: string;
	thumbnail: string;
	title: string;
	url: string;
}

type TTimelineSource = Array<
	"main" | "homeTimeline" | "localTimeline" | "hybridTimeline" | "globalTimeline"
>;
