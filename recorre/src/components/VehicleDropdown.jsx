import { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import './styles/VehicleDropdown.css';

const VehicleDropdown = ({ handleOptimizeRoute }) => {
  const [vehicleType, setVehicleType] = useState('car');
  
  const getVehicleIcon = (type) => {
    switch (type) {
      case 'car':
        return 'fa-car';
      case 'bike':
        return 'fa-bicycle';
      case 'foot':
        return 'fa-walking';
      default:
        return 'fa-car';
    }
  };

  return (
    <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000, display: 'flex', gap: '10px' }}>
      <Dropdown onSelect={(eventKey) => setVehicleType(eventKey)}>
        <Dropdown.Toggle variant="btn btn-outline-light" id="dropdown-basic">
          <i className={`fa-solid ${getVehicleIcon(vehicleType)}`}></i> {vehicleType}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="car">Coche</Dropdown.Item>
          <Dropdown.Item eventKey="bike">Bicicleta</Dropdown.Item>
          <Dropdown.Item eventKey="foot">A pie</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button onClick={handleOptimizeRoute} className="blinking-button">
      <i class="fa-solid fa-route"></i> Optimizar!
      </Button>
    </div>
  );
};

export default VehicleDropdown;
