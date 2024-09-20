import React, { useState, useEffect, useRef } from 'react';
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
  const [address, setAddress] = useState(''); // Dirección actual
  const markerRef = useRef(null);

  // Obtiene la ubicación del usuario al montar el componente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPosition = [position.coords.latitude, position.coords.longitude];
          setPosition(userPosition);
          setZoom(15); // Aumenta el zoom al obtener la ubicación
          fetchAddress(userPosition[0], userPosition[1]); // Obtiene la dirección de la ubicación actual
        },
        () => {
          console.error("Error al obtener la ubicación.");
        }
      );
    } else {
      console.error("Geolocalización no es soportada por este navegador.");
    }
  }, []);

  // Geocodificación inversa para obtener la dirección
  const fetchAddress = async (lat, lng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    setAddress(data.display_name || `Lat: ${lat}, Lon: ${lng}`);
  };

  // Función para manejar el arrastre del marcador
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const newPos = marker.getLatLng();
      setPosition([newPos.lat, newPos.lng]);
      fetchAddress(newPos.lat, newPos.lng); // Actualiza la dirección tras mover el marcador
    }
  };

  const handleSearch = (query) => {
    console.log(`Buscando: ${query}`);
    setPosition([51.51, -0.1]); // Cambia esto por la lógica de búsqueda real
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <SearchBar onSearch={handleSearch} value={address} /> {/* Barra de búsqueda con la dirección */}
      {position && (
        <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }} zoomControl={false} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Mapa oscuro
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <Marker
            position={position}
            draggable={true} // Hacer que el marcador sea arrastrable
            eventHandlers={{ dragend: handleDragEnd }} // Manejar el evento de arrastre
            ref={markerRef}
          >
            <Popup>
              Un marcador en esta ubicación. {/* Mensaje en el popup */}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
