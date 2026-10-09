const BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export async function request(path, { token, body, method = 'GET', signal } = {}) {
  let response
  try {
    response = await fetch(`${BASE_URL}/api${path}`, {
      method,
      signal,
      headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { 'x-access-token': token } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('Unable to reach the server. Check your connection and try again.', { cause: error })
  }
  const data = await response.json().catch(() => null)
  if (!response.ok) { const error = new Error(data?.message || 'Something went wrong. Please try again.'); error.status = response.status; throw error }
  return data
}
