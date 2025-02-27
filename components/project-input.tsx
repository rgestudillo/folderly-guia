"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, MapPin } from "lucide-react"
import { loadGoogleMapsApi } from "@/utils/loadGoogleMapsApi"

interface ProjectInputProps {
  projectData: {
    idea: string
    location: string
    coordinates: { lat: number; lng: number } | null
  }
  updateProjectData: (
    data: Partial<{
      idea: string
      location: string
      coordinates: { lat: number; lng: number } | null
    }>,
  ) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onNext: () => void
}

export function ProjectInput({
  projectData,
  updateProjectData,
  searchQuery,
  setSearchQuery,
  onNext,
}: ProjectInputProps) {
  const [error, setError] = useState("")
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function initAutocomplete() {
      await loadGoogleMapsApi()
      if (!inputRef.current) return

      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, { types: ["geocode"] })
      autocompleteRef.current.addListener("place_changed", handlePlaceSelect)
    }

    initAutocomplete()
  }, [])

  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) return

    const place = autocompleteRef.current.getPlace()
    if (!place.geometry || !place.geometry.location) {
      console.log("No details available for input: '" + place.name + "'")
      return
    }

    const location = place.formatted_address || place.name || ""
    const coordinates = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }

    setSearchQuery(location)
    updateProjectData({ location, coordinates })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectData.idea || !projectData.location) {
      setError("Please fill in both fields")
      return
    }
    setError("")
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="project-idea" className="text-lg font-medium text-green-800">
          Project Idea
        </Label>
        <div className="relative">
          <Leaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
          <Input
            id="project-idea"
            placeholder="e.g., Mangrove Restoration in Lapu-Lapu City"
            value={projectData.idea}
            onChange={(e) => updateProjectData({ idea: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-location" className="text-lg font-medium text-green-800">
          Project Location
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
          <Input
            ref={inputRef}
            id="project-location"
            placeholder="Search Location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        Next
      </Button>
    </form>
  )
}

