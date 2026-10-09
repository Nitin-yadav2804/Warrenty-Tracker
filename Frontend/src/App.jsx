import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import { readSession, saveSession } from './utils/session'

export default function App() {
  const [session, setSession] = useState(readSession)
  function login(value) { saveSession(value); setSession(value) }
  return session ? <main className="min-h-screen bg-stone-100 p-8 text-emerald-950"><button className="rounded-xl bg-emerald-900 px-4 py-2 text-white" onClick={() => login(null)}>Sign out</button><h1 className="mt-10 text-4xl font-semibold">Welcome, {session.user.name}.</h1></main> : <AuthPage onLogin={login} />
}
