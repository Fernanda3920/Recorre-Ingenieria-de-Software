import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';
import LocationList from './LocationList';
import 'bootstrap/dist/css/bootstrap.min.css';
import polyline from '@mapbox/polyline';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState('');
    const [locations, setLocations] = useState([]); // Incluye nombre y coordenadas
    const [route, setRoute] = useState([]); // Estado para guardar la ruta optimizada
    const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPosition = [position.coords.latitude, position.coords.longitude];
        setPosition(userPosition);
        fetchAddress(userPosition[0], userPosition[1]);
      });
    }
  }, []);

  const fetchAddress = async (lat, lng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    setAddress(data.display_name || `Lat: ${lat}, Lon: ${lng}`);
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        
        // Guarda un objeto con la dirección y las coordenadas
        setLocations((prev) => [...prev, { lat: parseFloat(lat), lng: parseFloat(lon), display_name }]);
        setPosition(newPosition); // Actualiza la posición
    
        // Cambia la vista del mapa a la nueva posición
        mapRef.current.setView(newPosition, 15);
      } else {
        console.error("No se encontró la dirección");
      }
    } catch (error) {
      console.error("Error al buscar la dirección:", error);
    }
  };

  const fetchOptimizedRoute = async (startCoords, endCoords) => {
    const apiKey = '8bfb01f1-4e92-4260-abf0-7e19014f7b5c';
    const url = `https://graphhopper.com/api/1/route?point=${startCoords[0]},${startCoords[1]}&point=${endCoords[0]},${endCoords[1]}&vehicle=car&locale=en&points_encoded=true&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
  
      if (!data.paths || data.paths.length === 0) {
        throw new Error('No se encontraron rutas');
      }
  
      // Decodificar la ruta
      const route = polyline.decode(data.paths[0].points);
      return route;
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  // Optimizar la ruta basada en las ubicaciones
  const handleOptimizeRoute = (updatedLocations) => {
    const locationsToUse = updatedLocations || locations; // Usa las ubicaciones actualizadas si se pasan
    if (locationsToUse.length > 1) {
      const startCoords = [locationsToUse[0].lat, locationsToUse[0].lng];
      const endCoords = [locationsToUse[locationsToUse.length - 1].lat, locationsToUse[locationsToUse.length - 1].lng];
      fetchOptimizedRoute(startCoords, endCoords).then((optimizedRoute) => {
        if (optimizedRoute) {
          setRoute(optimizedRoute);
        }
      });
    } else {
      alert('Necesitas al menos dos ubicaciones para optimizar la ruta.');
    }
  };
  
  const handleMarkerDragEnd = (loc, e) => {
    const newPos = e.target.getLatLng(); // Obtén la nueva posición del marcador
  
    setLocations((prev) => {
      const updatedLocations = prev.map((location) =>
        location.display_name === loc.display_name
          ? { ...location, lat: newPos.lat, lng: newPos.lng }
          : location
      );
  
      // Llama a la función de optimización de rutas solo después de actualizar las ubicaciones
      handleOptimizeRoute(updatedLocations);
      
      // Actualiza la dirección inmediatamente
      fetchAddress(newPos.lat, newPos.lng).then(() => {
        // Aquí puedes abrir el Popup si es necesario
        e.target.openPopup();
      });
  
      return updatedLocations; // Retorna el nuevo estado
    });
  };
  
  
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <SearchBar onSearch={handleSearch} value={address} />

      {position && (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <ZoomControl position="bottomright" />
          
          {/* Renderiza todos los marcadores */}
          {locations.map((loc, index) => (
             <Marker
             key={index}
             position={[loc.lat, loc.lng]}
             draggable={true}
             eventHandlers={{
               dragend: (e) => handleMarkerDragEnd(loc, e) // Asegúrate de pasar el evento aquí
             }}
           >
              <Popup>
                {loc.display_name || 'Ubicación sin nombre'}
              </Popup>
            </Marker>
          ))}
          
          {/* Dibuja la polilínea de la ruta optimizada */}
          {route.length > 0 && (
            <Polyline positions={route} color="#38C7D5" />
          )}
        </MapContainer>
      )}

      <LocationList
        locations={locations.map(loc => loc.display_name)}
      />

      {/* Botón para optimizar la ruta */}
      <button
        onClick={handleOptimizeRoute}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        Optimizar Ruta
      </button>
    </div>
  );
};

export default MapView;
