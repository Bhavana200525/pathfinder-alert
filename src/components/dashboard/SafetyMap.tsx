import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const LocationMarker = ({ onLocationFound }: { onLocationFound: (lat: number, lng: number) => void }) => {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
    map.on("locationfound", (e) => {
      onLocationFound(e.latlng.lat, e.latlng.lng);
    });
  }, [map, onLocationFound]);

  return null;
};

interface SafetyMapProps {
  className?: string;
}

const SafetyMap = ({ className }: SafetyMapProps) => {
  const [position, setPosition] = useState<[number, number]>([20, 0]);
  const [located, setLocated] = useState(false);

  const handleLocationFound = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setLocated(true);
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-border ${className || ""}`}>
      <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
        <MapPin className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-card-foreground">Live Location</span>
        {located && <span className="ml-auto text-xs text-safe">● Active</span>}
      </div>
      <MapContainer
        center={position}
        zoom={located ? 16 : 2}
        className="h-[300px] w-full"
        style={{ background: "hsl(220, 25%, 6%)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker onLocationFound={handleLocationFound} />
        {located && (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default SafetyMap;
