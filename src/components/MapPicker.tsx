'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false })
const ClickHandler = dynamic(() => import('./MapClickHandler'), { ssr: false })

interface MapPickerProps {
  lat: number | null
  lon: number | null
  address?: string
  onChange: (lat: number | null, lon: number | null) => void
}

// Bulgaria center as default
const BG_CENTER: [number, number] = [42.7, 25.4]

export default function MapPicker({ lat, lon, address, onChange }: MapPickerProps) {
  const [geocoding, setGeocoding] = useState(false)

  // Fix Leaflet default marker icon
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

  const findOnMap = async () => {
    if (!address) return
    setGeocoding(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'bg', 'User-Agent': 'Petral/1.0' } }
      )
      const results = await res.json()
      if (results.length > 0) {
        onChange(parseFloat(results[0].lat), parseFloat(results[0].lon))
      }
    } finally {
      setGeocoding(false)
    }
  }

  const center: [number, number] = lat && lon ? [lat, lon] : BG_CENTER

  return (
    <div className="space-y-2">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div className="rounded-lg overflow-hidden border border-gray-300">
        <MapContainer
          center={center}
          zoom={lat && lon ? 13 : 7}
          style={{ height: '280px', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {lat && lon && <Marker position={[lat, lon]} />}
          <ClickHandler onMapClick={onChange} />
        </MapContainer>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={findOnMap}
          disabled={!address || geocoding}
          className="text-sm bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {geocoding ? 'Търсене...' : 'Намери адреса на картата'}
        </button>
        {lat && lon && (
          <button
            type="button"
            onClick={() => onChange(null, null)}
            className="text-sm border border-gray-300 hover:border-gray-400 text-gray-600 px-3 py-1.5 rounded-lg transition-colors"
          >
            Изчисти позицията
          </button>
        )}
        <span className="text-xs text-gray-400">
          {lat && lon
            ? `📍 ${lat.toFixed(5)}, ${lon.toFixed(5)}`
            : 'Кликни на картата за да зададеш позиция'}
        </span>
      </div>
    </div>
  )
}
