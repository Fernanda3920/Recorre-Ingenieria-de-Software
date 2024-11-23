import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar Link y useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Feed.css';
// Importa las imágenes
import foto1Bisket from './img/foto_1_Bisket.jpeg';
import foto2Bisket from './img/foto_2_Bisket.jpeg';
import logoBisket from './img/logo_Bisket.jpeg';
import logoEsencia from './img/logo_Esencia.jpeg';
import foto1Esencia from './img/foto_1_Esencia.jpeg';
import foto2Esencia from './img/foto_2_Esencia.jpeg';

function Restaurantes() {
  const navigate = useNavigate(); // Inicializa navigate

  // Función para navegar a la ruta deseada
  const handleNavigate = () => {
    navigate('/Map');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar" style={{ backgroundColor: '#d5006d' }}>
        <div className="container-fluid">
          <h3 className="navbar-logo text-white">Divierte</h3>
          <ul className="navbar-menu d-flex list-unstyled">
            <li className="me-3"><Link to="/Cafeterias" className="navbar-link text-white">Cafeterías</Link></li>
            <li className="me-3"><Link to="/Bares" className="navbar-link text-white">Bares</Link></li>
            <li className="me-3"><Link to="/Map" className="navbar-link text-white">Mapa</Link></li>
          </ul>
        </div>
      </nav>

      {/* Carrusel de Inicio */}
      <div id="carruselCafeterias" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={logoBisket} className="d-block w-100" alt="Cafetería 1" />
          </div>
          <div className="carousel-item">
            <img src={logoEsencia} className="d-block w-100" alt="Cafetería 2" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carruselCafeterias" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carruselCafeterias" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Inicio */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Restaurantes Imperdibles</h2>
        <p className="text-center mb-4">Descubre una selección de restaurantes en Tijuana que ofrecen experiencias gastronómicas únicas.</p>
        
        {/* Tarjetas Horizontales */}
        <div className="row justify-content-center">
          {/* Tarjeta 1 */}
          <div className="col-md-6 col-sm-12 mb-3">
            <div className="card custom-card w-100">
              <img className="card-img-top" src={foto2Esencia} alt="Cafetería Central" />
              <div className="card-body">
                <h5 className="card-title" onClick={handleNavigate} style={{ cursor: 'pointer' }}>El BisKet Restaurante Y Cafeteria</h5>
                <p className="card-text" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
                  El Bisket Restaurante y Cafeteria se especializa en desayunos y brunch. Su menú ofrece una variedad de opciones populares, como chilaquiles y panecillos, junto con café artesanal. Es un lugar ideal para reuniones informales o para trabajar en un ambiente tranquilo.
                </p>
                <p className="card-text">
                  <small className="text-muted">Av. Centro Comercial 17202, Otay Constituyentes, 22457 Tijuana, B.C.</small>
                </p>
              </div>
            </div>
          </div>

          {/* Carrusel 1 */}
          <div className="col-md-6 col-sm-12 mb-3 text-center">
            <div id="carruselCafeteria1" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={foto1Esencia} className="d-block w-100" alt="Cafetería 1-1" />
                </div>
                <div className="carousel-item">
                  <img src={foto2Esencia} className="d-block w-100" alt="Cafetería 1-2" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carruselCafeteria1" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carruselCafeteria1" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="col-md-6 col-sm-12 mb-3">
            <div className="card custom-card w-100">
              <img className="card-img-top" src={foto2Bisket} alt="Café La Esquina" />
              <div className="card-body">
                <h5 className="card-title" onClick={handleNavigate} style={{ cursor: 'pointer' }}>Esencia Restaurante</h5>
                <p className="card-text" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
                  Esencia Restaurante es conocido por su ambiente acogedor y platos bien presentados, con un enfoque en cocina mexicana y fusión. El menú incluye opciones como chilaquiles de birria, mole y tortillas hechas a mano. Es un lugar ideal para disfrutar de desayunos y comidas en familia o con amigos.
                </p>
                <p className="card-text">
                  <small className="text-muted">Av. Paseo del Lago 19621, Lago Sur, 22210 Tijuana, B.C.</small>
                </p>
              </div>
            </div>
          </div>

          {/* Carrusel 2 */}
          <div className="col-md-6 col-sm-12 mb-3 text-center">
            <div id="carruselCafeteria2" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={foto1Bisket} className="d-block w-100" alt="Cafetería 2-1" />
                </div>
                <div className="carousel-item">
                  <img src={foto2Bisket} className="d-block w-100" alt="Cafetería 2-2" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carruselCafeteria2" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carruselCafeteria2" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Restaurantes;
