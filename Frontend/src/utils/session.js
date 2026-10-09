const KEY = 'warranty-keeper-session'

export function readSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(KEY))
    if (!session?.token || !session?.user?.id) return null
    const payload = JSON.parse(atob(session.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    if (!payload.exp || payload.exp * 1000 <= Date.now()) { sessionStorage.removeItem(KEY); return null }
    return session
  } catch { return null }
}

export function saveSession(session) { try { session ? sessionStorage.setItem(KEY, JSON.stringify(session)) : sessionStorage.removeItem(KEY) } catch { /* in-memory session continues */ } }
