declare namespace google {
    namespace maps {
        class Map {
            constructor(mapDiv: HTMLElement, options?: MapOptions);
            setCenter(center: LatLng | LatLngLiteral): void;
        }

        class Marker {
            constructor(opts?: MarkerOptions);
            setPosition(position: LatLng | LatLngLiteral): void;
        }

        class Circle {
            constructor(opts?: CircleOptions);
            setRadius(radius: number): void;
            setCenter(center: LatLng | LatLngLiteral): void;
        }

        interface MapOptions {
            center?: LatLng | LatLngLiteral;
            zoom?: number;
            mapId?: string;
            disableDefaultUI?: boolean;
            zoomControl?: boolean;
            mapTypeControl?: boolean;
            streetViewControl?: boolean;
            fullscreenControl?: boolean;
        }

        interface MarkerOptions {
            position?: LatLng | LatLngLiteral;
            map?: Map;
            animation?: Animation;
        }

        interface CircleOptions {
            strokeColor?: string;
            strokeOpacity?: number;
            strokeWeight?: number;
            fillColor?: string;
            fillOpacity?: number;
            map?: Map;
            center?: LatLng | LatLngLiteral;
            radius?: number;
        }

        interface LatLngLiteral {
            lat: number;
            lng: number;
        }

        class LatLng {
            constructor(lat: number, lng: number);
            lat(): number;
            lng(): number;
        }

        enum Animation {
            DROP,
            BOUNCE
        }

        namespace places {
            class Autocomplete {
                constructor(
                    inputField: HTMLInputElement,
                    options?: AutocompleteOptions
                );
                addListener(event: string, handler: () => void): void;
                getPlace(): PlaceResult;
            }

            interface AutocompleteOptions {
                types?: string[];
            }

            interface PlaceResult {
                name?: string;
                formatted_address?: string;
                geometry?: {
                    location: {
                        lat(): number;
                        lng(): number;
                    };
                };
            }
        }
    }
}

interface Window {
    google: typeof google;
    initMap: () => void;
} 