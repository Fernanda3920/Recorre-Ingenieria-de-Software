// MapView.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';

// Importa los íconos de marcador
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configuración del ícono del marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
  const [position, setPosition] = useState(null); // Posición inicial
  const [zoom, setZoom] = useState(13); // Zoom inicial

  // Obtiene la ubicación del usuario al montar el componente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPosition = [position.coords.latitude, position.coords.longitude];
          setPosition(userPosition);
          setZoom(15); // Aumenta el zoom al obtener la ubicación
        },
        () => {
          console.error("Error al obtener la ubicación.");
        }
      );
    } else {
      console.error("Geolocalización no es soportada por este navegador.");
    }
  }, []);

  const handleSearch = (query) => {
    console.log(`Buscando: ${query}`);
    setPosition([51.51, -0.1]); // Cambia esto por la lógica de búsqueda real
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <SearchBar onSearch={handleSearch} />
      {position && ( // Renderiza el mapa solo si la posición está disponible
        <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }} zoomControl={false} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Mapa oscuro
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <Marker position={position}>
            <Popup>
              Un marcador en esta ubicación.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
/*

*/