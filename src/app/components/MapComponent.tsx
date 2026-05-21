import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  lat: number;
  lng: number;
  hotelName: string;
  city: string;
  price: number;
}

export function MapComponent({ lat, lng, hotelName, city, price }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map only once
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([lat, lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
    }

    // Update map view and marker when location changes
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], 13);

      // Remove old marker
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Add new marker
      markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current);
      markerRef.current.bindPopup(`
        <div style="text-align: center;">
          <strong>${hotelName}</strong><br/>
          ${city}<br/>
          R$ ${price}/noite
        </div>
      `).openPopup();
    }

    return () => {
      // Cleanup marker on unmount
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
  }, [lat, lng, hotelName, city, price]);

  // Cleanup map on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-xl" />;
}
