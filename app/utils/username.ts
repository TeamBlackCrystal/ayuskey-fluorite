export const getUsername = (
	user: { name: string, host: null | string, username: string },
) => {
	return user.name ? `@${user.name}${(
		user.host ? `@${user.host}` : ""
	)}` : `@${user.username}`;
};
