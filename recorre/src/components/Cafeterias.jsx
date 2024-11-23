import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar Link y useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Feed.css';

// Importa las imágenes
import foto1Velvet from './img/foto_1_Velvet.jpeg';
import foto2Velvet from './img/foto_2_Velvet.jpeg';
import logoVelvet from './img/logo_Velvet.jpeg';
import logoPontee from './img/logo_Pontee.jpeg';
import foto1Pontee from './img/foto_1_Pontee.jpeg';
import foto2Pontee from './img/foto_2_Pontee.jpeg';

function Cafeterias() {
  const navigate = useNavigate(); // Mueve useNavigate aquí

  return (
    <>
      {/* Navbar */}
      <nav className="navbar" style={{ backgroundColor: '#d5006d' }}>
        <div className="container-fluid">
          <h3 className="navbar-logo text-white">Divierte</h3>
          <ul className="navbar-menu d-flex list-unstyled">
            <li className="me-3"><Link to="/Restaurantes" className="navbar-link text-white">Restaurantes</Link></li>
            <li className="me-3"><Link to="/Bares" className="navbar-link text-white">Bares</Link></li>
            <li className="me-3"><Link to="/Map" className="navbar-link text-white">Mapa</Link></li>
          </ul>
        </div>
      </nav>

      {/* Carrusel de Inicio */}
      <div id="carruselCafeterias" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={logoVelvet} className="d-block w-100" alt="Cafetería 1" />
          </div>
          <div className="carousel-item">
            <img src={logoPontee} className="d-block w-100" alt="Cafetería 2" />
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
        <h2 className="text-center mb-4">Cafeterías para disfrutar una Tarde Relajada</h2>
        <p className="text-center mb-4">
          Disfruta de un café artesanal en un ambiente acogedor. Perfecto para desconectar, leer o trabajar, estas cafeterías ofrecen una atmósfera ideal para cualquier ocasión.
        </p>
        
        {/* Tarjetas Horizontales */}
        <div className="row justify-content-center">
          {/* Tarjeta */}
          <div className="col-md-6 col-sm-12 mb-3">
            <div className="card custom-card w-100">
              <img className="card-img-top" src={foto2Velvet} alt="Cafetería Central" />
              <div className="card-body">
                <h5 className="card-title">VELVET CAFE & BISTRO</h5>
                <p className="card-text">
                  Velvet Cafe es conocido por su estilo elegante y contemporáneo, con una decoración que mezcla lo moderno con lo vintage, creando un espacio sofisticado ideal para citas o reuniones de trabajo. Ofrece una amplia variedad de cafés, mezclas especiales y bebidas frías, con opciones veganas y sin gluten disponibles. Sus postres caseros, como pasteles, son muy apreciados por los clientes. Velvet Cafe se distingue por su atención al detalle tanto en la calidad de sus productos como en el diseño del lugar, brindando una experiencia refinada y calmada.
                </p>
                <p className="card-text">
                  <small className="text-muted" onClick={() => navigate('/Map')}>Av Gobernador Balarezo, Davila, 22044 Tijuana, B.C.</small>
                </p>
              </div>
            </div>
          </div>

          {/* Carrusel 1 */}
          <div className="col-md-6 col-sm-12 mb-3 text-center">
            <div id="carruselCafeteria1" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={foto1Velvet} className="d-block w-100" alt="Cafetería 1-1" />
                </div>
                <div className="carousel-item">
                  <img src={foto2Velvet} className="d-block w-100" alt="Cafetería 1-2" />
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
              <img className="card-img-top" src={foto2Pontee} alt="Café La Esquina" />
              <div className="card-body">
                <h5 className="card-title">Pontee Café</h5>
                <p className="card-text">
                  Pontee Cafe se destaca en Tijuana por su ambiente minimalista y acogedor, decorado con detalles en madera y plantas, creando un espacio perfecto para estudiar, trabajar o relajarse. Su menú ofrece cafés de especialidad elaborados con granos seleccionados cuidadosamente, así como opciones de alimentos ligeros como paninis, ensaladas y postres artesanales. El enfoque de Pontee Cafe es brindar una experiencia auténtica y tranquila, donde la calidad del café es la prioridad y los baristas están siempre dispuestos a recomendar nuevas mezclas y métodos de preparación.
                </p>
                <p className="card-text" onClick={() => navigate('/Map')}>
                  <small className="text-muted">Calle Tacubaya 880, Blvd. Gustavo Díaz Ordaz 14005, Guillen, 22106 Tijuana, B.C.</small>
                </p>
              </div>
            </div>
          </div>

          {/* Carrusel 2 */}
          <div className="col-md-6 col-sm-12 mb-3 text-center">
            <div id="carruselCafeteria2" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={foto1Pontee} className="d-block w-100" alt="Cafetería 2-1" />
                </div>
                <div className="carousel-item">
                  <img src={foto2Pontee} className="d-block w-100" alt="Cafetería 2-2" />
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

export default Cafeterias;
