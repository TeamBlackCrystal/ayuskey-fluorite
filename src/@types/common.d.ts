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

type TAyuskeyPermission = Array<
| "read:account"
| "write:account"
| "read:blocks"
| "write:blocks"
| "read:drive"
| "write:drive"
| "read:favorites"
| "write:favorites"
| "read:following"
| "write:following"
| "read:messaging"
| "write:messaging"
| "read:mutes"
| "write:mutes"
| "write:notes"
| "read:notifications"
| "write:notifications"
| "read:reactions"
| "write:reactions"
| "write:votes"
| "read:pages"
| "write:pages"
| "write:page-likes"
| "read:page-likes"
| "read:user-groups"
| "write:user-groups"
| "read:channels"
| "write:channels"
| "read:registry"
| "write:registry"
>;
