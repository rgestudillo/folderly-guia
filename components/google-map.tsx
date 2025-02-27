"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

interface GoogleMapProps {
  center: { lat: number; lng: number }
  zoom: number
  mapId: string
  radius: number
}

export default function GoogleMapComponent({ center, zoom, mapId, radius }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const [circle, setCircle] = useState<google.maps.Circle | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!mapRef.current) return

    const initMap = () => {
      const mapOptions: google.maps.MapOptions = {
        center,
        zoom,
        mapId,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      }

      if (mapRef.current) {
        const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
        setMap(newMap)

        // Add marker
        const newMarker = new window.google.maps.Marker({
          position: center,
          map: newMap,
          animation: window.google.maps.Animation.DROP,
        })
        setMarker(newMarker)

        // Add circle
        const newCircle = new window.google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.15,
          map: newMap,
          center: center,
          radius: radius,
        })
        setCircle(newCircle)

        setIsLoading(false)
      }
    }

    if (window.google && window.google.maps) {
      initMap()
    } else {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`
      script.async = true
      document.head.appendChild(script)
      window.initMap = initMap
    }
  }, [center, zoom, mapId, radius]) // Added radius to dependencies

  // Update circle radius when it changes
  useEffect(() => {
    if (circle) {
      circle.setRadius(radius)
    }
  }, [radius, circle])

  // Update map center and marker when coordinates change
  useEffect(() => {
    if (map && marker && circle && center) {
      map.setCenter(center)
      marker.setPosition(center)
      circle.setCenter(center)
    }
  }, [map, marker, circle, center])

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Loading map...</span>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}

