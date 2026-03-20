'use client'

import dynamic from 'next/dynamic'

const ProductMap = dynamic(() => import('./ProductMap'), { ssr: false })

interface ProductMapLoaderProps {
  address: string
  lat?: number | null
  lon?: number | null
}

export default function ProductMapLoader({ address, lat, lon }: ProductMapLoaderProps) {
  return <ProductMap address={address} lat={lat} lon={lon} />
}
