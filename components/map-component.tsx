'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'
import { useEstimatorStore } from '@/lib/store'

import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

interface MapComponentProps {
  className?: string
}

export function MapComponent({ className }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const draw = useRef<MapboxDraw | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const { 
    address, 
    setPolygon, 
    setSquareFootage, 
    setIsDrawing,
    calculateEstimate 
  } = useEstimatorStore()

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize Mapbox
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 4
    })

    // Initialize drawing controls
    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    })

    map.current.addControl(draw.current)

    // Handle map load
    map.current.on('load', () => {
      setIsLoaded(true)
    })

    // Handle drawing events
    map.current.on('draw.create', handleDrawCreate)
    map.current.on('draw.update', handleDrawUpdate)
    map.current.on('draw.delete', handleDrawDelete)
    map.current.on('draw.modechange', handleModeChange)

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  // Geocode address and fly to location
  useEffect(() => {
    if (!address || !map.current || !isLoaded) return

    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}&limit=1`
        )
        const data = await response.json()
        
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center
          map.current?.flyTo({
            center: [lng, lat],
            zoom: 18,
            duration: 2000
          })
        }
      } catch (error) {
        console.error('Geocoding error:', error)
      }
    }

    geocodeAddress()
  }, [address, isLoaded])

  const handleDrawCreate = (e: any) => {
    const feature = e.features[0]
    if (feature.geometry.type === 'Polygon') {
      const coordinates = feature.geometry.coordinates[0]
      setPolygon(coordinates)
      calculateArea(coordinates)
      setIsDrawing(false)
    }
  }

  const handleDrawUpdate = (e: any) => {
    const feature = e.features[0]
    if (feature.geometry.type === 'Polygon') {
      const coordinates = feature.geometry.coordinates[0]
      setPolygon(coordinates)
      calculateArea(coordinates)
    }
  }

  const handleDrawDelete = () => {
    setPolygon([])
    setSquareFootage(0)
    setIsDrawing(false)
  }

  const handleModeChange = (e: any) => {
    setIsDrawing(e.mode === 'draw_polygon')
  }

  const calculateArea = (coordinates: number[][]) => {
    try {
      const polygon = turf.polygon([coordinates])
      const area = turf.area(polygon)
      const squareFootage = Math.round(area * 10.764) // Convert m² to ft²
      setSquareFootage(squareFootage)
      calculateEstimate()
    } catch (error) {
      console.error('Area calculation error:', error)
    }
  }

  const clearDrawing = () => {
    if (draw.current) {
      draw.current.deleteAll()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-hidden"
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={clearDrawing}
          className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-md shadow-md text-sm font-medium transition-colors"
        >
          Clear Drawing
        </button>
      </div>
      
      {/* Drawing Instructions */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
        <p className="text-sm text-gray-700">
          <strong>Instructions:</strong> Click to start drawing a polygon around the landscaping area. 
          Double-click to finish.
        </p>
      </div>
    </div>
  )
} 