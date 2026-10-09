export const statusLabels = { active: 'Active', 'expiring-soon': 'Expiring soon', expired: 'Expired' }

export function formatDate(value) { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Not set' : new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date) }

export function filterDevices(devices, { query = '', status = 'all', category = 'all', sort = 'newest' }) {
  const term = query.trim().toLowerCase()
  return devices.filter(device => (!term || `${device.name} ${device.brand} ${device.category}`.toLowerCase().includes(term)) && (status === 'all' || device.warrantyStatus === status) && (category === 'all' || device.category === category)).sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : sort === 'expiry' ? new Date(a.warrantyEndDate) - new Date(b.warrantyEndDate) : new Date(b.createdAt) - new Date(a.createdAt))
}
