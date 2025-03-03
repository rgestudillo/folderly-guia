"use client";

import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import {
  circle as turfCircle,
  distance as turfDistance,
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
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const centerMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const isDraggingArcRef = useRef(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialZoom = 0.5;
    const finalZoom = zoom;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom: initialZoom,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      // Add DEM source for 3D terrain
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.setPitch(45);

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

      // Fly from initial view to target center and zoom.
      map.flyTo({
        center: [center.lng, center.lat],
        zoom: finalZoom,
        duration: 4000,
        easing: (t) => t,
      });

      // Create and add circle source and layers.
      const circleFeature = turfCircle([center.lng, center.lat], radius, {
        steps: 64,
        units: "meters",
      });
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
        const updatedCircle = turfCircle(
          [newCenter.lng, newCenter.lat],
          radius,
          {
            steps: 64,
            units: "meters",
          }
        );
        (map.getSource("circle") as mapboxgl.GeoJSONSource).setData(
          updatedCircle
        );

        if (onCenterChange) {
          onCenterChange({ lat: newCenter.lat, lng: newCenter.lng });
        }
      });

      map.on("mousedown", "circle-outline-hit", (e) => {
        e.preventDefault();
        isDraggingArcRef.current = true;
        map.getCanvas().style.cursor = "ew-resize";

        map.on("mousemove", onArcDrag);
        map.once("mouseup", onArcDragEnd);
      });
    });

    const onArcDrag = (e: mapboxgl.MapMouseEvent) => {
      if (
        !isDraggingArcRef.current ||
        !mapRef.current ||
        !centerMarkerRef.current
      )
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
          properties: {},
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [pointerLngLat.lng, pointerLngLat.lat],
          },
          properties: {},
        },
        { units: "meters" }
      );

      const updatedCircle = turfCircle(
        [centerCoords.lng, centerCoords.lat],
        newRadius,
        { steps: 64, units: "meters" }
      );
      (map.getSource("circle") as mapboxgl.GeoJSONSource).setData(
        updatedCircle
      );

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

  // When center or radius change, update the circle and smoothly transition the zoom
  // so that the circle (fitting the given radius) is in view.
  useEffect(() => {
    if (mapRef.current && centerMarkerRef.current) {
      centerMarkerRef.current.setLngLat([center.lng, center.lat]);
      const updatedCircle = turfCircle([center.lng, center.lat], radius, {
        steps: 64,
        units: "meters",
      });
      (mapRef.current.getSource("circle") as mapboxgl.GeoJSONSource).setData(
        updatedCircle
      );

      // Compute the bounding box for the circle.
      const bounds = turfBbox(updatedCircle);
      // Get the camera options required to fit the bounds (this returns {center, zoom, pitch, bearing}).
      const cameraOptions = mapRef.current.cameraForBounds(
        [
          bounds[0],
          bounds[1],
          bounds[2],
          bounds[3],
        ] as mapboxgl.LngLatBoundsLike,
        {
          padding: 20,
        }
      );
      if (cameraOptions) {
        // Smoothly transition the zoom (and center) so that the entire circle fits the view.
        mapRef.current.easeTo({
          center: [center.lng, center.lat],
          zoom: cameraOptions.zoom,
          duration: 2000,
        });
      }
    }
  }, [center, radius]);

  // Rotate the map if rotateMap is true.
  // Instead of snapping the center instantly, we interpolate the center toward the pinned marker.
  useEffect(() => {
    if (!mapRef.current) return;
    let animationFrameId: number;
    let currentBearing = mapRef.current.getBearing();

    const smoothFactor = 0.05; // Adjust recentering speed (0 = no recentering, 1 = instant).
    const smoothFactorZoom = 0.05; // Adjust zoom interpolation speed.

    const rotate = () => {
      currentBearing = (currentBearing + 0.7) % 360; // Adjust rotation speed as desired.

      if (centerMarkerRef.current && mapRef.current) {
        const markerPos = centerMarkerRef.current.getLngLat();
        const currentCenter = mapRef.current.getCenter();
        const newCenter = {
          lng:
            currentCenter.lng +
            (markerPos.lng - currentCenter.lng) * smoothFactor,
          lat:
            currentCenter.lat +
            (markerPos.lat - currentCenter.lat) * smoothFactor,
        };

        // Compute the desired zoom level by creating a new circle with the updated center and provided radius.
        const newCircle = turfCircle([newCenter.lng, newCenter.lat], radius, {
          steps: 64,
          units: "meters",
        });
        const bounds = turfBbox(newCircle);
        const cameraOptions = mapRef.current.cameraForBounds(
          [
            bounds[0],
            bounds[1],
            bounds[2],
            bounds[3],
          ] as mapboxgl.LngLatBoundsLike,
          {
            padding: 20,
          }
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
