"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loadGoogleMapsApi } from "@/utils/loadGoogleMapsApi"

export default function Home() {
  const [projectData, setProjectData] = useState({
    idea: "",
    location: "",
    coordinates: null as { lat: number; lng: number } | null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadGoogleMapsApi().then(() => initAutocomplete())
  }, [])

  const initAutocomplete = () => {
    if (!inputRef.current) return

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, { types: ["geocode"] })
    autocompleteRef.current.addListener("place_changed", handlePlaceSelect)
  }

  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) return

    const place = autocompleteRef.current.getPlace()
    if (!place.geometry) {
      console.log("No details available for input: '" + place.name + "'")
      return
    }

    setProjectData((prev) => ({
      ...prev,
      location: place.formatted_address || place.name || "",
      coordinates: {
        lat: place.geometry?.location.lat() || 0,
        lng: place.geometry?.location.lng() || 0,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!projectData.idea || !projectData.location) return

    setIsLoading(true)

    try {
      sessionStorage.setItem("projectData", JSON.stringify(projectData))
      router.push(`/sustainability`)
    } catch (error) {
      console.error("Error saving project data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative bg-gradient-to-b from-green-50 to-blue-50">
      <div className="absolute inset-0 z-0">
        <Image src="/map-background.jpg" alt="Map Background" fill className="object-cover opacity-30" priority />
      </div>

      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 md:p-12 max-w-3xl w-full mx-4 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-green-800">Sustainable Project Planner</h1>

        <p className="text-lg md:text-xl text-center mb-8 text-green-700">
          Plan your sustainable project and assess environmental risks in your area.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="project-idea" className="text-lg font-medium text-green-700">
              Project Idea
            </Label>
            <div className="relative">
              <Leaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <Input
                id="project-idea"
                placeholder="e.g., Community Garden in Central Park"
                value={projectData.idea}
                onChange={(e) => setProjectData((prev) => ({ ...prev, idea: e.target.value }))}
                className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-location" className="text-lg font-medium text-green-700">
              Project Location
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <Input
                ref={inputRef}
                id="project-location"
                placeholder="Search Location"
                value={projectData.location}
                onChange={(e) => setProjectData((prev) => ({ ...prev, location: e.target.value }))}
                className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Plan Your Sustainable Project"}
          </Button>
        </form>
      </div>
    </div>
  )
}

