import { safeJsonParse } from '../utils';

export async function getTwitterSession(session) {
  const response = await fetch(`/api/twitter?session=${session}`)
  const data = await response.text();
  return safeJsonParse(data, {}).response || {};
}
