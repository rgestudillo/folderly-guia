"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  circle as turfCircle,
  bbox as turfBbox,
} from "@turf/turf";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface MapboxMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  radius: number; // in meters
  onRadiusChange?: (newRadius: number) => void;
  onCenterChange?: (newCenter: { lat: number; lng: number }) => void;
  rotateMap?: boolean;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  center,
  zoom,
  radius,
  onRadiusChange,
  onCenterChange,
  rotateMap = false,
}) => {
  // Maintain a local center state to keep updates from marker dragging.
  const [currentCenter, setCurrentCenter] = useState(center);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const centerMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialZoom = 0.5;
    const finalZoom = zoom;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [currentCenter.lng, currentCenter.lat],
      zoom: initialZoom,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      // Add DEM source for 3D terrain.
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.setPitch(45);

      // Hide default landuse layers to prevent them from conflicting
      // with our custom landuse layer.
      const defaultLanduseLayers = ["landuse", "landuse_overlay"];
      defaultLanduseLayers.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, "visibility", "none");
        }
      });

      // Add custom landuse layer using the composite source's "landuse" data.
      // Adjust the colors and landuse types as desired.
      map.addLayer({
        id: "custom-landuse",
        type: "fill",
        source: "composite",
        "source-layer": "landuse",
        paint: {
          "fill-color": [
            "match",
            ["get", "class"],
            "park", "#a8e6a3",       // parks: light green
            "residential", "#f5f5dc", // residential: beige
            "commercial", "#ffd700",  // commercial: gold
            "industrial", "#d3d3d3",  // industrial: light gray
            "forest", "#228B22",      // forest: forest green
            /* default */ "#cccccc"
          ],
          "fill-opacity": 0.5,
        },
      });

      // Determine a label layer for insertion reference.
      let labelLayerId: string | undefined;
      const style = map.getStyle();
      const layers = style?.layers || [];
      if (layers.length > 0) {
        for (const layer of layers) {
          if (
            layer.type === "symbol" &&
            layer.layout &&
            (layer.layout as any)["text-field"]
          ) {
            labelLayerId = layer.id;
            break;
          }
        }
      }

      // Add the 3D buildings layer.
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

      // Move our custom landuse layer behind the 3D buildings so that
      // extruded buildings appear on top.
      if (map.getLayer("add-3d-buildings")) {
        map.moveLayer("custom-landuse", "add-3d-buildings");
      }

      // Fly from the initial view to the target center and zoom.
      map.flyTo({
        center: [currentCenter.lng, currentCenter.lat],
        zoom: finalZoom,
        duration: 4000,
        easing: (t) => t,
      });

      // Create and add a circle source and its layers.
      const circleFeature = turfCircle(
        [currentCenter.lng, currentCenter.lat],
        radius,
        { steps: 64, units: "meters" }
      );
      map.addSource("circle", {
        type: "geojson",
        data: circleFeature,
      });

      map.addLayer({
        id: "circle-fill",
        type: "fill",
        source: "circle",
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.3,
        },
      });

      map.addLayer({
        id: "circle-outline",
        type: "line",
        source: "circle",
        paint: {
          "line-color": "#0080ff",
          "line-width": 2,
        },
      });

      // Add a draggable center marker.
      const centerMarker = new mapboxgl.Marker({
        draggable: true,
        color: "#00FF00",
      })
        .setLngLat([currentCenter.lng, currentCenter.lat])
        .addTo(map);
      centerMarkerRef.current = centerMarker;

      centerMarker.on("dragend", () => {
        const newCenter = centerMarker.getLngLat();
        setCurrentCenter({ lat: newCenter.lat, lng: newCenter.lng });
        const updatedCircle = turfCircle(
          [newCenter.lng, newCenter.lat],
          radius,
          { steps: 64, units: "meters" }
        );
        (map.getSource("circle") as mapboxgl.GeoJSONSource).setData(
          updatedCircle
        );
        if (onCenterChange) {
          onCenterChange({ lat: newCenter.lat, lng: newCenter.lng });
        }
      });
    });

    return () => {
      map.remove();
    };
  }, []); // Run once on mount

  // Update the circle and recenter the view when the center or radius change.
  useEffect(() => {
    if (mapRef.current && centerMarkerRef.current) {
      centerMarkerRef.current.setLngLat([currentCenter.lng, currentCenter.lat]);
      const updatedCircle = turfCircle(
        [currentCenter.lng, currentCenter.lat],
        radius,
        { steps: 64, units: "meters" }
      );
      (mapRef.current.getSource("circle") as mapboxgl.GeoJSONSource).setData(
        updatedCircle
      );

      const bounds = turfBbox(updatedCircle);
      const cameraOptions = mapRef.current.cameraForBounds(
        [bounds[0], bounds[1], bounds[2], bounds[3]] as mapboxgl.LngLatBoundsLike,
        { padding: 20 }
      );
      if (cameraOptions) {
        mapRef.current.easeTo({
          center: [currentCenter.lng, currentCenter.lat],
          zoom: cameraOptions.zoom,
          duration: 700,
        });
      }
    }
  }, [currentCenter, radius]);

  // Optional: Rotate the map if rotateMap is true.
  useEffect(() => {
    if (!mapRef.current) return;
    let animationFrameId: number;
    let currentBearing = mapRef.current.getBearing();
    const smoothFactor = 0.05;
    const smoothFactorZoom = 0.05;

    const rotate = () => {
      currentBearing = (currentBearing + 0.1) % 360;
      if (centerMarkerRef.current && mapRef.current) {
        const markerPos = centerMarkerRef.current.getLngLat();
        const currentCenterVal = mapRef.current.getCenter();
        const newCenter = {
          lng:
            currentCenterVal.lng +
            (markerPos.lng - currentCenterVal.lng) * smoothFactor,
          lat:
            currentCenterVal.lat +
            (markerPos.lat - currentCenterVal.lat) * smoothFactor,
        };
        const newCircle = turfCircle(
          [newCenter.lng, newCenter.lat],
          radius,
          { steps: 64, units: "meters" }
        );
        const bounds = turfBbox(newCircle);
        const cameraOptions = mapRef.current.cameraForBounds(
          [bounds[0], bounds[1], bounds[2], bounds[3]] as mapboxgl.LngLatBoundsLike,
          { padding: 20 }
        );
        if (cameraOptions) {
          const currentZoom = mapRef.current.getZoom();
          const desiredZoom = cameraOptions.zoom || currentZoom;
          const newZoom =
            currentZoom + (desiredZoom - currentZoom) * smoothFactorZoom;
          mapRef.current.setZoom(newZoom);
        }
        mapRef.current.setCenter(newCenter);
      }
      mapRef.current?.setBearing(currentBearing);
      animationFrameId = requestAnimationFrame(rotate);
    };

    if (rotateMap) {
      animationFrameId = requestAnimationFrame(rotate);
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotateMap, radius]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default MapboxMap;
