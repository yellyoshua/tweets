export function safeLowercase(str) {
	return typeof str === 'string' ? str.toLowerCase() : str;
}

export function safeJsonParse(str, def = {}) {
	try {
		return typeof str === 'string' ? JSON.parse(str) : {};
	} catch (error) {
		return def;
	}
}
