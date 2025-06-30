

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
}

export function payloadNames(payloads: any[]): string[] {
  return payloads.map(p => p.name || 'Inconnu')
}

export function clientNames(payloads: any[]): string[] {
  const clients = payloads.flatMap(p => p.customers || [])
  return [...new Set(clients)]
}

export function youtubeEmbedUrl(url: string): string {
  const id = url.includes('youtube') ? url.split('v=')[1]?.split('&')[0] || url.split('/').pop() : url
  return `https://www.youtube.com/embed/${id}`
}

