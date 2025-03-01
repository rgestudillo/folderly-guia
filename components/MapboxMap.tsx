"use client";

import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import {
  circle as turfCircle,
  distance as turfDistance,
} from "@turf/turf";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface MapboxMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  radius: number; // in meters
  rainEnabled?: boolean;
  onRadiusChange?: (newRadius: number) => void;
  onCenterChange?: (newCenter: { lat: number; lng: number }) => void;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  center,
  zoom,
  radius,
  rainEnabled = false,
  onRadiusChange,
  onCenterChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const centerMarkerRef = useRef<mapboxgl.Marker | null>(null);
  // Flag for arc drag
  const isDraggingArcRef = useRef(false);
  // Refs for rain effect
  const rainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rainAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Define an initial zoom level that shows a very zoomed-out view.
    const initialZoom = 0.5;
    const finalZoom = zoom;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom: initialZoom, // Start zoomed out.
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      // ---- Enable 3D Terrain and 3D Buildings ----
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.setPitch(45);

      // Determine the label layer id to insert the 3D buildings layer beneath.
      let labelLayerId: string | undefined;
      const layers = map.getStyle().layers;
      if (layers) {
        for (const layer of layers) {
          if (layer.type === "symbol" && layer.layout && (layer.layout as any)["text-field"]) {
            labelLayerId = layer.id;
            break;
          }
        }
      }
      map.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );
      // -------------------------------------------

      // Animate from the zoomed-out view to your desired center and zoom.
      map.flyTo({
        center: [center.lng, center.lat],
        zoom: finalZoom,
        duration: 4000, // duration in ms; adjust as needed.
        easing: (t) => t,
      });

      // Create the circle source using Turf.js
      const circleFeature = turfCircle([center.lng, center.lat], radius, {
        steps: 64,
        units: "meters",
      });
      map.addSource("circle", {
        type: "geojson",
        data: circleFeature,
      });

      // Add a fill layer for the circle.
      map.addLayer({
        id: "circle-fill",
        type: "fill",
        source: "circle",
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.3,
        },
      });

      // Add a thin visible outline layer for the circle.
      map.addLayer({
        id: "circle-outline",
        type: "line",
        source: "circle",
        paint: {
          "line-color": "#0080ff",
          "line-width": 2,
        },
      });

      // Add an invisible hit layer with a wider line width for easier dragging.
      map.addLayer({
        id: "circle-outline-hit",
        type: "line",
        source: "circle",
        paint: {
          "line-color": "#000000",
          "line-opacity": 0,
          "line-width": 40,
        },
      });

      // Add a draggable center marker.
      const centerMarker = new mapboxgl.Marker({
        draggable: true,
        color: "#00FF00",
      })
        .setLngLat([center.lng, center.lat])
        .addTo(map);
      centerMarkerRef.current = centerMarker;

      centerMarker.on("dragend", () => {
        const newCenter = centerMarker.getLngLat();
        const updatedCircle = turfCircle([newCenter.lng, newCenter.lat], radius, {
          steps: 64,
          units: "meters",
        });
        (map.getSource("circle") as mapboxgl.GeoJSONSource).setData(updatedCircle);

        if (onCenterChange) {
          onCenterChange({ lat: newCenter.lat, lng: newCenter.lng });
        }
      });

      // --- Draggable Arc Setup ---
      map.on("mousedown", "circle-outline-hit", (e) => {
        e.preventDefault();
        isDraggingArcRef.current = true;
        map.getCanvas().style.cursor = "ew-resize";

        map.on("mousemove", onArcDrag);
        map.once("mouseup", onArcDragEnd);
      });
    });

    const onArcDrag = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      if (!isDraggingArcRef.current || !mapRef.current || !centerMarkerRef.current)
        return;
      const map = mapRef.current;
      const centerCoords = centerMarkerRef.current.getLngLat();
      const pointerLngLat = map.unproject(e.point);
      const newRadius = turfDistance(
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [centerCoords.lng, centerCoords.lat],
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [pointerLngLat.lng, pointerLngLat.lat],
          },
        },
        { units: "meters" }
      );

      const updatedCircle = turfCircle(
        [centerCoords.lng, centerCoords.lat],
        newRadius,
        { steps: 64, units: "meters" }
      );
      (map.getSource("circle") as mapboxgl.GeoJSONSource).setData(updatedCircle);

      if (onRadiusChange) {
        onRadiusChange(newRadius);
      }
    };

    const onArcDragEnd = () => {
      if (!mapRef.current) return;
      isDraggingArcRef.current = false;
      mapRef.current.getCanvas().style.cursor = "";
      mapRef.current.off("mousemove", onArcDrag);
    };

    return () => {
      map.remove();
    };
  }, []); // Run once on mount

  // External updates for center and radius.
  useEffect(() => {
    if (mapRef.current && centerMarkerRef.current) {
      centerMarkerRef.current.setLngLat([center.lng, center.lat]);
      const updatedCircle = turfCircle([center.lng, center.lat], radius, {
        steps: 64,
        units: "meters",
      });
      (mapRef.current.getSource("circle") as mapboxgl.GeoJSONSource).setData(updatedCircle);
    }
  }, [center, radius]);

  // Rain effect: add or remove canvas overlay based on rainEnabled prop.
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (rainEnabled) {
      // Create canvas overlay.
      const canvas = document.createElement("canvas");
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      mapContainerRef.current.appendChild(canvas);
      rainCanvasRef.current = canvas;

      // Set canvas dimensions to match the container.
      const rect = mapContainerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Create raindrops array.
      const drops: {
        x: number;
        y: number;
        length: number;
        speed: number;
      }[] = [];
      const numDrops = 150;
      for (let i = 0; i < numDrops; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: 10 + Math.random() * 10,
          speed: 2 + Math.random() * 2,
        });
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const animate = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(174,194,224,0.5)";
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        for (const drop of drops) {
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x, drop.y + drop.length);
          ctx.stroke();
          drop.y += drop.speed;
          if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
          }
        }
        rainAnimationRef.current = requestAnimationFrame(animate);
      };

      animate();
    } else {
      // If rain is disabled, remove the canvas and cancel animation.
      if (rainCanvasRef.current) {
        cancelAnimationFrame(rainAnimationRef.current!);
        rainCanvasRef.current.remove();
        rainCanvasRef.current = null;
      }
    }

    // Cleanup on unmount or when rainEnabled changes.
    return () => {
      if (rainCanvasRef.current) {
        cancelAnimationFrame(rainAnimationRef.current!);
        rainCanvasRef.current.remove();
        rainCanvasRef.current = null;
      }
    };
  }, [rainEnabled]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapboxMap;
