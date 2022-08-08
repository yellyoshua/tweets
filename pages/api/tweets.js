import { safeJsonParse, safeLowercase } from '../../src/utils';

const allowed_methods = ['post', 'get'];
export default async function handler(req, res) {
	const {API_URL, API_KEY}  = process.env || {};
	const method = safeLowercase(req.method);

	if (!allowed_methods.includes(method)) {
		return res.status(405).json({
			statusCode: 405,
			message: 'Method not allowed',
		})
	}

	if (method === 'get') {
		const url = new URL(API_URL + '/tweets');
		if (req.query?.session) {
			url.searchParams.append('session', req.query.session);
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': API_KEY,
			}
		});

		const data = await response.text();
		return res.status(200).json(safeJsonParse(data));
	}

	const response = await fetch(API_URL + '/tweets', {
		method: 'POST',
		body: JSON.stringify(req.body || {}),
		headers: {
			'Content-Type': 'application/json',
			'authorization': API_KEY,
		}
	})
	const data = await response.text();
  res.status(200).json(safeJsonParse(data));
}
