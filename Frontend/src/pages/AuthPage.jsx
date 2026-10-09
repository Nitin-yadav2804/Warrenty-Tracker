import { useState } from 'react'
import { request } from '../services/api'

export default function AuthPage({ onLogin, notice }) {
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const [message, setMessage] = useState(notice || '')
  const [busy, setBusy] = useState(false)
  const register = mode === 'register'

  async function submit(event) {
    event.preventDefault(); setError(''); setMessage(''); setBusy(true)
    const values = Object.fromEntries(new FormData(event.currentTarget))
    try {
      const data = await request(`/auth/${mode}`, { method: 'POST', body: values })
      if (register) { setMode('login'); setMessage('Account created. Sign in to start your collection.') }
      else onLogin({ token: data.token, user: data.user })
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return <main className="min-h-screen bg-stone-100 text-emerald-950 grid lg:grid-cols-2">
    <section className="hidden lg:flex flex-col justify-between bg-emerald-950 text-white p-16"><div className="flex items-center gap-3 text-xl font-semibold tracking-tight"><span className="grid size-10 place-items-center rounded-xl bg-emerald-700 text-emerald-100">⌂</span>Warranty<span className="font-normal text-emerald-300">Keeper</span></div><div className="max-w-xl"><p className="text-xs uppercase tracking-[.3em] text-emerald-300">A little less to worry about</p><h1 className="mt-6 text-6xl font-semibold leading-[1.04] tracking-tight">Your devices.<br />Their warranties.<br /><span className="font-serif italic text-emerald-300">One calm place.</span></h1><p className="mt-8 max-w-sm text-lg leading-8 text-emerald-100/70">Keep track of what’s covered, what’s expiring, and the things you rely on every day.</p></div><p className="text-sm text-emerald-100/60">⌁ Your collection stays yours.</p></section>
    <section className="flex items-center justify-center bg-white px-6 py-12 sm:px-12"><div className="w-full max-w-md"><p className="text-xs font-semibold uppercase tracking-[.25em] text-emerald-700">Your personal warranty book</p><h2 className="mt-5 text-4xl font-semibold tracking-tight text-emerald-950">{register ? 'Make room for peace of mind.' : 'Welcome back.'}</h2><p className="mt-3 text-slate-500">{register ? 'Create an account to keep your devices together.' : 'Sign in to see how your devices are doing.'}</p><form onSubmit={submit} className="mt-9 space-y-5">{register && <label className="block text-sm font-semibold text-slate-700">Your name<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" name="name" required maxLength={100} placeholder="Nitin Yadav" /></label>}<label className="block text-sm font-semibold text-slate-700">Email address<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" name="email" type="email" required placeholder="you@example.com" /></label><label className="block text-sm font-semibold text-slate-700">Password<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" name="password" type="password" required minLength={register ? 12 : undefined} placeholder={register ? 'At least 12 characters' : 'Enter your password'} /></label>{error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}{message && <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" role="status">{message}</p>}<button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60" disabled={busy}>{busy ? 'Please wait…' : register ? 'Create account' : 'Sign in'} <span>→</span></button></form><p className="mt-7 text-center text-sm text-slate-500">{register ? 'Already have an account?' : 'New here?'} <button className="font-semibold text-emerald-800 hover:underline" onClick={() => { setMode(register ? 'login' : 'register'); setError(''); setMessage('') }}>{register ? 'Sign in' : 'Create an account'}</button></p></div></section>
  </main>
}
