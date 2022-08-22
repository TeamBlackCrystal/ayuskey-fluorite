type Schema = {
	resource: {
    "/api/auth/session/userkey": {
      POST: {
        body: {
          appSecret: string
          token: string
        }
        response: {accessToken: string}
      }
    },
    "/api/auth/session/generate": {
      POST: {
        body: {
          appSecret: string
        },
        responce: {
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
