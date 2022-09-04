export const getLocalStorage = <T>(
	key: string,
	defaultValue: T,
	json: boolean = false,
): T => {
	const item = window.localStorage.getItem(key);
	return item ? (json ? JSON.parse(item) : item) : defaultValue;
};

export const setLocalStorage = (key: string, value: object | string): void => {
	const _value = typeof value === "object" ? JSON.stringify(value) : value;
	window.localStorage.setItem(key, _value);
};

export const removeLocalStorage = (key: string) => {
	window.localStorage.removeItem(key);
};
