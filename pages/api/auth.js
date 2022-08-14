import { safeJsonParse, safeLowercase } from '../../src/utils';

const allowed_methods = ['get'];
export default async function handler(req, res) {
	const {API_URL}  = process.env || {};
	const method = safeLowercase(req.method);

	if (!allowed_methods.includes(method)) {
		return res.status(405).json({
			statusCode: 405,
			message: 'Method not allowed',
		})
	}

  return res.redirect(`${API_URL}/twitter-authorization`);
}
