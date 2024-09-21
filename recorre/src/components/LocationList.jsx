import React, { useState, useEffect } from 'react';

const LocationList = ({ locations, onRemoveLocation }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Cambiar a true para que inicie colapsado
  const [iconColor, setIconColor] = useState('#38C7D5'); // Color inicial del ícono

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  const handleRemoveLocation = (loc) => {
    onRemoveLocation(loc);
  };

  // Efecto para cambiar el color del ícono cuando se agrega una nueva ubicación
  useEffect(() => {
    if (locations.length > 0) {
      setIconColor('#D8FCFF'); // Color al agregar ubicación
      const timer = setTimeout(() => {
        setIconColor('#38C7D5'); // Regresar al color original después de 1 segundo
      }, 1000);

      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
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

      {/* Icono de ubicación visible en estado colapsado */}
      {isCollapsed && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <i className="fas fa-map-marker-alt" 
             style={{ color: iconColor, fontSize: '24px', transition: 'color 0.5s ease' }}></i>
        </div>
      )}

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
                {loc}
              </div>
            ))
          ) : (
            <p>No se encontraron ubicaciones.</p>
          )}
          <button type="button" class="btn btn-success"><i class="fa-solid fa-route"></i> Optimizar mi ruta</button>
        </>
      )}
    </div>
  );
};

export default LocationList;
