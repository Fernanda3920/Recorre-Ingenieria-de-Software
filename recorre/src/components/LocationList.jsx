import React, { useState, useEffect } from 'react';

const LocationList = ({ locations, onRemoveLocation }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [iconColor, setIconColor] = useState('#38C7D5');

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  const handleRemoveLocation = (loc) => {
    onRemoveLocation(loc);
  };

  const handleSaveLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ names: locations }), // Envía el array de ubicaciones
      });

      if (!response.ok) {
        throw new Error('Error al guardar las ubicaciones');
      }

      const data = await response.json();
      console.log(data.message); // Maneja la respuesta como desees
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    if (locations.length > 0) {
      setIconColor('#D8FCFF');
      const timer = setTimeout(() => {
        setIconColor('#38C7D5');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [locations]);

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      width: isCollapsed ? '50px' : '250px',
      height: 'calc(100% - 20px)',
      backgroundColor: '#1c1c1c',
      color: 'white',
      padding: '20px',
      fontSize: '15px',
      zIndex: 1000,
      boxShadow: '2px 0 5px rgba(0,0,0,0.7)',
      overflowY: 'auto',
      transition: 'width 0.3s ease-in-out'
    }}>
      <button
        onClick={toggleCollapse}
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

      {!isCollapsed && (
        <>
          <h4>Ubicaciones</h4>
          {locations.length > 0 ? (
            locations.map((loc, index) => (
              <div key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                <i 
                  className="fas fa-map-marker-alt" 
                  style={{ color: '#38C7D5', cursor: 'pointer', marginRight: '5px' }} 
                  onClick={() => handleRemoveLocation(loc)}
                ></i>
                <span>{index + 1}. {loc}</span>
              </div>
            ))
          ) : (
            <p>No se encontraron ubicaciones.</p>
          )}
          <button onClick={handleSaveLocations}>
            Guardar Ubicaciones
          </button>
        </>
      )}
    </div>
  );
};

export default LocationList;
