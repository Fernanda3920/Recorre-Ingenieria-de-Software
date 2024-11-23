import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBar from './SearchBar';
import LocationList from './LocationList';
import { Link } from 'react-router-dom'; // Importar Link para navegación
import 'bootstrap/dist/css/bootstrap.min.css';
import VehicleDropdown from './VehicleDropdown';
import polyline from '@mapbox/polyline';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Eliminando la opción por defecto del icono del marcador
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
  const [hasSearched, setHasSearched] = useState(false);
  const [vehicleType, setVehicleType] = useState('car'); // Valor por defecto
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
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      setAddress(data.display_name || `Lat: ${lat}, Lon: ${lng}`);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setLocations((prev) => [...prev, { lat: parseFloat(lat), lng: parseFloat(lon), display_name }]);
        setPosition(newPosition); // Actualiza la posición
        setHasSearched(true); // Actualiza el estado a verdadero
        mapRef.current.setView(newPosition, 15);
      } else {
        console.error("No se encontró la dirección");
      }
    } catch (error) {
      console.error("Error al buscar la dirección:", error);
    }
  };

  const fetchOptimizedRoute = async (points) => {
    const apiKey =  '8bfb01f1-4e92-4260-abf0-7e19014f7b5c'; // Reemplaza esto por tu API key en un lugar seguro
    const pointsString = points.map(point => `${point.lat},${point.lng}`).join('&point=');
    const url = `https://graphhopper.com/api/1/route?point=${pointsString}&vehicle=${vehicleType}&locale=en&points_encoded=true&key=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      if (!data.paths || data.paths.length === 0) {
        throw new Error('No se encontraron rutas');
      }
      const route = polyline.decode(data.paths[0].points);
      return route;
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const handleOptimizeRoute = () => {
    if (locations.length > 1 || (hasSearched && locations.length === 1)) {
      fetchOptimizedRoute(locations).then((optimizedRoute) => {
        if (optimizedRoute) {
          setRoute(optimizedRoute);
        }
      });
    } else {
      alert('Necesitas al menos dos ubicaciones para optimizar la ruta.');
    }
  };

  const handleMarkerDragEnd = (loc, e) => {
    const newPos = e.target.getLatLng();
    setLocations((prev) => {
      const updatedLocations = prev.map((location) =>
        location.display_name === loc.display_name
          ? { ...location, lat: newPos.lat, lng: newPos.lng }
          : location
      );
      fetchAddress(newPos.lat, newPos.lng).then(() => {
        e.target.openPopup();
      });
      return updatedLocations;
    });
  };

  const handleRemoveLocation = (loc) => {
    setLocations((prev) => prev.filter(location => location.display_name !== loc));
  };

  const onAddLocationToMap = (locationName) => {
    const foundLocation = locations.find(loc => loc.display_name === locationName);
    if (foundLocation) {
      setPosition([foundLocation.lat, foundLocation.lng]);
      mapRef.current.setView([foundLocation.lat, foundLocation.lng], 15);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Agregando el Navbar personalizado */}
      <nav className="navbar" style={{ backgroundColor: '#d5006d' }}>
        <div className="container-fluid">
          <h2  className="navbar-logo text-white">Divierte</h2>
          <ul className="navbar-menu d-flex list-unstyled">
            <li className="me-3">
              <Link to="/Cafeterias" className="navbar-link text-white">Cafeterías</Link>
            </li>
            <li className="me-3">
              <Link to="/Restaurantes" className="navbar-link text-white">Restaurantes</Link>
            </li>
            <li className="me-3">
              <Link to="/Bares" className="navbar-link text-white">Bares</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenedor que ajusta el mapa dejando espacio para el navbar */}
      <div style={{ flex: 1, position: 'relative' }}>
        <SearchBar onSearch={handleSearch} value={address} />
        {position && (
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <ZoomControl position="bottomright" />
            {locations.map((loc, index) => (
              <Marker
                key={index}
                position={[loc.lat, loc.lng]}
                draggable={true}
                eventHandlers={{
                  dragend: (e) => handleMarkerDragEnd(loc, e)
                }}
              >
                <Popup>
                  {loc.display_name || 'Ubicación sin nombre'}
                </Popup>
              </Marker>
            ))}
            {route.length > 0 && (
              <Polyline positions={route} color="#38C7D5" />
            )}
          </MapContainer>
        )}
        <LocationList
          locations={locations.map(loc => loc.display_name)}
          onRemoveLocation={handleRemoveLocation}
          onAddLocationToMap={onAddLocationToMap}
        />
        <VehicleDropdown handleOptimizeRoute={handleOptimizeRoute} />
      </div>
    </div>
  );
};

export default MapView;

