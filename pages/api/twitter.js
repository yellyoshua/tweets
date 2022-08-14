import { safeJsonParse, safeLowercase } from '../../src/utils';

const allowed_methods = ['get'];
export default async function handler(req, res) {
	const {API_URL, API_KEY}  = process.env || {};
	const method = safeLowercase(req.method);

	if (!allowed_methods.includes(method)) {
		return res.status(405).json({
			statusCode: 405,
			message: 'Method not allowed',
		})
	}
  const url = new URL(API_URL + '/twitter-session');
  url.searchParams.append('session', req.query.session);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': API_KEY,
    }
  });

  const data = await response.text();
  const session = safeJsonParse(data, {}) || {};
  return res.status(response.status).json(session);
}
