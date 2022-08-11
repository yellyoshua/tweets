import { safeJsonParse } from '../utils';

export async function getTweets(session) {
  const response = await fetch(`/api/tweets?session=${session}`)
  const data = await response.text();
  return safeJsonParse(data, {}).response || [];
}

export async function postTweet(session, tweet = {}) {
  const response = await fetch('/api/tweets', {
    method: 'POST',
    body: JSON.stringify({
      session,
      content: tweet,
    }),
    headers: {
      'Content-Type': 'application/json',
      'authorization': API_KEY,
    },
  })
  const data = await response.text();
  return safeJsonParse(data, {}).response || [];
}
