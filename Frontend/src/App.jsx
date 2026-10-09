import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import { readSession, saveSession } from './utils/session'

export default function App() {
  const [session, setSession] = useState(readSession)
  function login(value) { saveSession(value); setSession(value) }
  return session ? <Dashboard session={session} onLogout={() => login(null)} onExpired={() => login(null)} /> : <AuthPage onLogin={login} />
}
