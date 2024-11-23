import React, { useState, useEffect } from 'react';
import SpeechSynthesis from './SpeechSynthesis.jsx';
import './styles/LocationList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de Toastify
import WeatherSuggestion from './WeatherSuggestion.jsx';


const LocationList = ({ locations, onRemoveLocation, onAddLocationToMap }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [activePanel, setActivePanel] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [savedCafes, setSavedCafes] = useState([]); // Definir savedCafes en el estado
  const [savedBars, setSavedBars] = useState([]); // Definir savedBars en el estado
  const [savedRestaurants, setSavedRestaurants] = useState([]); // Definir savedRestaurants en el estado
  const [iconColor, setIconColor] = useState('#38C7D5');
  const [instructions, setInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState({ instructions: [] });

  const toggleCollapse = (panel) => {  
    if (isCollapsed || activePanel !== panel) {
      setIsCollapsed(false);
      setActivePanel(panel);
      if (panel === 'indicaciones') {
        fetchRouteInstructions();
      } else if (panel === 'ubicaciones') {
        fetchSavedLocations();
      } else if (panel === 'cafes') {
        fetchSavedCafes();
      } else if (panel === 'bars') {
        fetchSavedBars();
      } else if (panel === 'restaurants') {
        fetchSavedRestaurants();
      }
    } else {
      setIsCollapsed(true);
      setActivePanel('');
    }
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error obteniendo la ubicación:', error);
            setUserLocation(null); // Asegúrate de manejar el estado de error
          }
        );
      } else {
        console.error('La geolocalización no es compatible con este navegador.');
      }
    };
    
    getUserLocation(); // Llamamos a la función para obtener la ubicación
  }, []);
  
  const handleSaveLocations = async () => {
    if (locations.length === 0) {
      alert('No hay ubicaciones para guardar.');
      return;
    }
  
    try {
      console.log('Enviando datos:', { locations }); // Asegúrate de que esto tenga la estructura correcta
  
      const response = await fetch('http://localhost:3001/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locations }), // Asegúrate de que "locations" está en este formato
      });
  
      if (!response.ok) {
        const errorDetails = await response.text(); // Más detalles del error
        console.error('Error desde el servidor:', errorDetails);
        throw new Error('Error al guardar las ubicaciones');
      }
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      alert('Ubicaciones guardadas exitosamente.');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Ocurrió un error al guardar las ubicaciones.');
    }
  };
  
  
  
  const fetchRouteInstructions = async () => {
    // Verifica que el panel activo sea el correcto y que haya al menos dos ubicaciones
    if (activePanel !== 'indicaciones' || locations.length < 2) {
      setInstructions([{ text: "Se necesitan al menos dos ubicaciones para obtener indicaciones." }]);
      return;
    }
  
    setIsLoading(true);
  
    // Función auxiliar para obtener las coordenadas de una dirección
    const getCoordinates = async (address) => {
      const apiKey = 'c69e018bdfc3478ba03c4aca0344d419';
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results[0].geometry; // Devuelve latitud y longitud
        } else {
          throw new Error(`No se encontraron coordenadas para la dirección: ${address}`);
        }
      } catch (error) {
        console.error('Error obteniendo coordenadas:', error);
        throw error;
      }
    };
  
    try {
      // Obtiene las coordenadas de las dos primeras ubicaciones
      const point1 = await getCoordinates(locations[0]);
      const point2 = await getCoordinates(locations[1]);
  
      // Realiza la solicitud a la API de GraphHopper
      const baseURL = 'https://graphhopper.com/api/1/route';
      const apiKey = '8bfb01f1-4e92-4260-abf0-7e19014f7b5c';
  
      const response = await fetch(
        `${baseURL}?point=${point1.lat},${point1.lng}&point=${point2.lat},${point2.lng}&instructions=true&vehicle=car&locale=es&key=${apiKey}`
      );
  
      if (!response.ok) {
        throw new Error('Error al obtener las instrucciones de ruta');
      }
  
      const data = await response.json();
  
      // Procesa las instrucciones de la ruta
      const routeInstructions = data.paths[0]?.instructions.map((instr) => ({
        text: instr.text,
        distance: instr.distance,
        time: instr.time,
      })) || [];
  
      if (routeInstructions.length === 0) {
        throw new Error('No se encontraron instrucciones en la respuesta.');
      }
  
      // Actualiza el estado con las instrucciones optimizadas
      setInstructions(routeInstructions);
      setOptimizedRoute({ instructions: routeInstructions });
    } catch (error) {
      console.error('Error al obtener instrucciones:', error);
      setInstructions([{ text: "No se pudieron cargar las instrucciones." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchSavedLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/locations');
      if (!response.ok) {
        throw new Error('Error al obtener las ubicaciones');
      }
      const data = await response.json();
      setSavedLocations(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (savedLocations.length > 0) {
      setIconColor('#D8FCFF');
      const timer = setTimeout(() => {
        setIconColor('#38C7D5');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [savedLocations]);
  const fetchSavedCafes = async () => {
    try {
      const response = await fetch('http://localhost:3001/cafes');
      if (!response.ok) {
        throw new Error('Error al obtener las cafeterías');
      }
      const data = await response.json();
      setSavedCafes(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchSavedBars = async () => {
    try {
      const response = await fetch('http://localhost:3001/bars');
      if (!response.ok) {
        throw new Error('Error al obtener los bares');
      }
      const data = await response.json();
      setSavedBars(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchSavedRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:3001/restaurants');
      if (!response.ok) {
        throw new Error('Error al obtener los restaurantes');
      }
      const data = await response.json();
      setSavedRestaurants(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleCopyToClipboard = (location) => {
    navigator.clipboard.writeText(location)
      .then(() => {
        alert(`Copiado: ${location}, buscame!`);
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles:', err);
      });
  };
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      width: isCollapsed ? '80px' : '250px',
      height: 'calc(100% - 70px)',
      backgroundColor: '#1c1c1c',
      color: 'white',
      padding: '15px',
      fontSize: '15px',
      zIndex: 1000,
      boxShadow: '2px 0 5px rgba(0,0,0,0.7)',
      overflowY: 'auto',
      transition: 'width 0.3s ease-in-out'
    }}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1001
        }}
      >
        <i className={isCollapsed ? 'fas fa-angle-double-right' : 'fas fa-angle-double-left'}></i>
      </button>

      {isCollapsed ? (
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '10px' }}>
          <div onClick={() => toggleCollapse('ubicaciones')} style={{ cursor: 'pointer' }}>
            <i className="fas fa-map-marker-alt" style={{ color: iconColor, fontSize: '24px' }}></i>
            <p>Ubicaciones</p>
          </div>
          <div onClick={() => toggleCollapse('indicaciones')} style={{ cursor: 'pointer' }}>
            <i className="fas fa-info-circle" style={{ color: iconColor, fontSize: '24px' }}></i>
            <p>Indicaciones</p>
          </div>
          <div onClick={() => toggleCollapse('sugerencias')} style={{ cursor: 'pointer' }}>
            <i className="fas fa-cloud" style={{ color: '#DEDEDE', fontSize: '24px' }}></i>
            <p>Clima</p>
          </div>
          <div onClick={() => toggleCollapse('cafes')} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-mug-saucer" style={{ color: '#DEDEDE', fontSize: '24px' }}></i>
            <p>Cafés</p>
          </div>
          <div onClick={() => toggleCollapse('bars')} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-wine-glass" style={{ color: '#DEDEDE', fontSize: '24px' }}></i>
            <p>Bares</p>
          </div>
          <div onClick={() => toggleCollapse('restaurants')} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-utensils" style={{ color: '#DEDEDE', fontSize: '24px' }}></i>
            <p>Restaurantes</p>
          
          </div>
        </div>
      ) : (
        <>
       {activePanel === 'cafes' && (
  <div>
    <h4>Cafeterías</h4>
    {savedCafes.length > 0 ? (
      savedCafes.map((cafe, index) => (
        <div key={index}>
          <i className="fa-solid fa-mug-saucer"/>
          <span 
             onClick={() => {
              handleCopyToClipboard(cafe); // Copiar al portapapeles
            }}  
            style={{ cursor: 'pointer' }}
          >
            {cafe}
          </span>
        </div>
      ))
    ) : (
      <p>No se encontraron cafeterías.</p>
    )}
  </div>
)}
{activePanel === 'bars' && (
  <div>
    <h4>Bares</h4>
    {savedBars.length > 0 ? (
      savedBars.map((bar, index) => (
        <div key={index}>
          <i className="fa-solid fa-wine-glass" />
          <span 
            onClick={() => {
              handleCopyToClipboard(bar); // Cambia cafe a bar
            }}  
            style={{ cursor: 'pointer' }}
          >
            {bar}
          </span>
        </div>
      ))
    ) : (
      <p>No se encontraron bares.</p>
    )}
  </div>
)}
{activePanel === 'restaurants' && (
  <div>
    <h4>Restaurantes</h4>
    {savedRestaurants.length > 0 ? (
      savedRestaurants.map((restaurant, index) => (
        <div key={index}>
          <i className="fa-solid fa-utensils" />
          <span 
            onClick={() => {
              handleCopyToClipboard(restaurant); // Cambia cafe a restaurant
            }} 
            style={{ cursor: 'pointer' }}
          >
            {restaurant}
          </span>
        </div>
      ))
    ) : (
      <p>No se encontraron restaurantes.</p>
    )}
  </div>
)}

          {activePanel === 'ubicaciones' && (
            <>
              <h4>Ubicaciones</h4>
              {savedLocations.length > 0 ? (
                <>
                  {savedLocations.map((loc, index) => (
                    <div key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                      <i 
                        className="fas fa-map-marker-alt" 
                        style={{ color: '#38C7D5', cursor: 'pointer', marginRight: '5px' }} 
                        onClick={() => onAddLocationToMap(loc)} 
                      ></i>
                      <span>{index + 1}. {loc}</span>
                    </div>
                  ))}
                 
                </>
              ) : (
                <p>No se encontraron ubicaciones.</p>
              )}
            </>
          )}
         {activePanel === 'sugerencias' && (
  <div>
    <WeatherSuggestion userLocation={userLocation} /> 
  </div>
)}

          {activePanel === 'indicaciones' && (
            <div style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '25px' }}>
              <h4>Indicaciones</h4>
              {isLoading ? (
                <p>Cargando instrucciones...</p>
              ) : instructions.length > 0 && instructions[0].text ? (
                <>
                  {instructions.map((instr, index) => {
                    const distance = instr.distance ? `${instr.distance} metros` : 'desconocida';
                    const time = instr.time ? `${Math.round(instr.time / 1000)} segundos` : 'desconocida';

                    return (
                      <div key={index}>
                        <p>
                          <strong>{index + 1}. {instr.text}</strong> - {distance}
                        </p>
                        <p>Duración: {time}</p>
                      </div>
                    );
                  })}
                  {optimizedRoute.instructions.length > 0 && (
                    <SpeechSynthesis optimizedRoute={optimizedRoute} />
                  )}
                </>
              ) : (
                <p>Esperando ruta optimizada...</p>
              )}
            </div>
          )}
           
        </>
      )}
    </div>
  );
};

export default LocationList;
