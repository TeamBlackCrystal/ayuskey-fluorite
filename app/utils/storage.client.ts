export const getLocalStorage = <T>(
	key: string,
	defaultValue: T,
	json: boolean = false,
): T => {
	if (typeof window !== "undefined") {
		const item = window.localStorage.getItem(key);
		return item ? (json ? JSON.parse(item) : item) : defaultValue;
	}
	return defaultValue;
};

export const setLocalStorage = (key: string, value: object | string): void => {
	if (typeof window !== "undefined") {
        const _value = typeof value === "object" ? JSON.stringify(value) : value;
        window.localStorage.setItem(key, _value);
	}
};

export const removeLocalStorage = (key:string) => {
    if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
    }
}