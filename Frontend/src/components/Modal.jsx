import { useEffect, useRef } from 'react'

export default function Modal({ title, description, close, children }) {
  const ref = useRef(null)
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => dialog?.close() }, [])
  return <dialog ref={ref} onCancel={event => { event.preventDefault(); close() }} className="w-[min(560px,calc(100%-2rem))] rounded-3xl border border-slate-200 bg-white p-0 text-emerald-950 shadow-2xl backdrop:bg-emerald-950/50"><div className="flex items-start justify-between gap-5 border-b border-slate-100 p-6 sm:p-8"><div><p className="text-xs font-semibold uppercase tracking-[.25em] text-emerald-700">Your device collection</p><h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>{description && <p className="mt-2 text-sm text-slate-500">{description}</p>}</div><button className="text-2xl text-slate-400 hover:text-slate-800" aria-label="Close dialog" onClick={close}>×</button></div>{children}</dialog>
}
