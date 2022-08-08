import { safeJsonParse, safeLowercase } from '../../src/utils';

const allowed_methods = ['post'];
export default async function handler(req, res) {
	const {API_URL, API_KEY}  = process.env || {};
	const method = safeLowercase(req.method);

	if (!allowed_methods.includes(method)) {
		return res.status(405).json({
			statusCode: 405,
			message: 'Method not allowed',
		})
	}

	const response = await fetch(API_URL + '/twitter/authorization', {
		method: 'POST',
		body: JSON.stringify(req.body || {}),
		headers: {
			'Content-Type': 'application/json',
			'authorization': API_KEY,
		}
	});

	const data = await response.text();
	res.status(200).json(safeJsonParse(data));
}
