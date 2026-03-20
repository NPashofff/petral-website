'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false })

interface ProductMapProps {
  address: string
  lat?: number | null
  lon?: number | null
}

interface GeoResult {
  lat: string
  lon: string
  display_name: string
}

export default function ProductMap({ address, lat, lon }: ProductMapProps) {
  const [coords, setCoords] = useState<[number, number] | null>(
    lat && lon ? [lat, lon] : null
  )
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(!lat || !lon)
  const [error, setError] = useState(false)

  useEffect(() => {
    // If explicit coordinates provided, use them directly
    if (lat && lon) {
      setCoords([lat, lon])
      setDisplayName(address)
      setLoading(false)
      return
    }

    if (!address) return

    setLoading(true)
    setError(false)

    // Build progressively shorter queries to retry with
    const parts = address.split(',').map(s => s.trim()).filter(Boolean)
    const queries: string[] = [address]
    for (let i = parts.length - 1; i >= 1; i--) {
      queries.push(parts.slice(0, i).join(', '))
    }

    const tryNext = async (remaining: string[]): Promise<void> => {
      if (remaining.length === 0) {
        setError(true)
        setLoading(false)
        return
      }
      const [query, ...rest] = remaining
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
          { headers: { 'Accept-Language': 'bg', 'User-Agent': 'Petral/1.0' } }
        )
        const results: GeoResult[] = await res.json()
        if (results.length > 0) {
          setCoords([parseFloat(results[0].lat), parseFloat(results[0].lon)])
          setDisplayName(results[0].display_name)
          setLoading(false)
        } else {
          await tryNext(rest)
        }
      } catch {
        setError(true)
        setLoading(false)
      }
    }

    tryNext(queries)
  }, [address])

  // Fix Leaflet default marker icon on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })
      })
    }
  }, [])

  if (loading) {
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
        Зареждане на картата...
      </div>
    )
  }

  if (error || !coords) {
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-3 text-gray-500 text-sm">
        <span>Адресът не е намерен автоматично</span>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Търси в Google Maps →
        </a>
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <MapContainer
        center={coords}
        zoom={13}
        style={{ height: '300px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>{displayName || address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
