import { safeJsonParse } from '../utils';

export async function getTweets(session) {
  const response = await fetch(`/api/tweets?session=${session}`)
  const data = await response.text();
  return safeJsonParse(data, {}).response || [];
}

export async function postTweet(session, content, _id = null) {
  const response = await fetch('/api/tweets', {
    method: 'POST',
    body: JSON.stringify({
      session,
      content,
      _id,
    }),
    headers: {'Content-Type': 'application/json'},
  })
  const data = await response.text();
  return safeJsonParse(data, {}).response || [];
}
