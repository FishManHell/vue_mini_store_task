const STORAGE_KEY = 'session_id'

let cached: string | null = null

export function getSessionId(): string {
  if (cached) return cached

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    cached = stored
    return stored
  }

  const fresh = crypto.randomUUID()
  localStorage.setItem(STORAGE_KEY, fresh)
  cached = fresh
  return fresh
}
