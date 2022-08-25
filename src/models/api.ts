import type  {UserDetailed} from "ayuskey.js/built/entities";

export type Schema = {
	resource: {
    "/url": {
      GET: {
        query: {
          url: string
        }
        response: {
          description: string
          icon: string
          sensitive: boolean
          player: {
            height: null
            url: null
            width: null
          }
          sitename: string
          thumbnail: string
          title: string
          url: string
        }
      }
    },
    "/api/auth/session/userkey": {
      POST: {
        body: {
          appSecret: string
          token: string
        }
        response: {accessToken: string, user: UserDetailed}
      }
    },
    "/api/i": {
      POST: {
        body: {
          i: string
        },
        response: UserDetailed
      }
    }
    "/api/auth/session/generate": {
      POST: {
        body: {
          appSecret: string
        },
        response: {
          token: string
          url: string
        }
      }
    },
		"/api/app/create": {
			POST: {
				body: {
					name: string;
					description: string;
					permission: string[];
					callbackUrl: string;
				};
				response: {
					id: string;
					name: string;
					callbackUrl: string;
					permission: TAyuskeyPermission;
          secret: string;
          isAuthorized: true;
				};
			};
		};
	};
};
