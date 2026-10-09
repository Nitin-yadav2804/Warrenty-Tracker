import { useState } from 'react'
import Modal from './Modal'

export default function DeleteDialog({ device, close, remove }) {
  const [busy, setBusy] = useState(false)
  return <Modal title="Remove this device?" description="This action cannot be undone." close={close}><div className="p-6 sm:p-8"><p className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-800"><strong>{device.name}</strong> and its warranty details will be removed.</p><div className="mt-6 flex justify-end gap-3"><button className="rounded-xl px-4 py-2.5 font-semibold text-slate-500 hover:bg-slate-100" onClick={close}>Keep device</button><button className="rounded-xl bg-red-700 px-5 py-2.5 font-semibold text-white hover:bg-red-800" disabled={busy} onClick={async () => { setBusy(true); await remove(device._id) }}>{busy ? 'Removing…' : 'Delete device'}</button></div></div></Modal>
}
