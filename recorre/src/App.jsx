import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';  // Asegúrate de tener la ruta correcta
import Login from './components/Login';      // Asegúrate de tener la ruta correcta
import MapView from './components/MapView';
import ParkingMap from './components/WeatherSuggestion';
import Restaurantes from './components/Restaurantes';
import Cafeterias from './components/Cafeterias';
import Bares from './components/Bares';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/wi' element={<ParkingMap/>}/>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/Restaurantes" element={<Restaurantes />} />
          <Route path="/Bares" element={<Bares/>} />
          <Route path="/Cafeterias" element={<Cafeterias />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;

