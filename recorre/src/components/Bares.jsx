import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Feed.css';
// Importa las imágenes
import foto1Mamut from './img/foto_1_Mamut.jpeg';
import foto2Mamut from './img/foto_2_Mamut.jpeg';
import logoMamut from './img/logo_Mamut.jpeg';
import logoLudica from './img/logo_Ludica.jpeg';
import foto1Ludica from './img/foto_1_Ludica.jpeg';
import foto2Ludica from './img/foto_2_Ludica.jpeg';

function Bares() {
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
            <li className="me-3"><Link to="/Restaurantes" className="navbar-link text-white">Restaurantes</Link></li>
            <li className="me-3"><Link to="/Map" className="navbar-link text-white">Mapa</Link></li>
          </ul>
        </div>
      </nav>

      {/* Carrusel de Inicio */}
      <div id="carruselCafeterias" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={logoMamut} className="d-block w-100" alt="Cafetería 1" />
          </div>
          <div className="carousel-item">
            <img src={logoLudica} className="d-block w-100" alt="Cafetería 2" />
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
        <h2 className="text-center mb-4">Bares para Disfrutar la Vida Nocturna</h2>
        <p className="text-center mb-4">Explora bares con cocteles únicos, música en vivo y un ambiente animado. El lugar perfecto para relajarte con amigos o disfrutar de una noche divertida.</p>
        
        {/* Tarjetas Horizontales */}
        <div className="row justify-content-center">
          {/* Tarjeta 1 */}
          <div className="col-md-6 col-sm-12 mb-3">
            <div className="card custom-card w-100">
              <img className="card-img-top" src={foto1Mamut} alt="Cafetería Central" />
              <div className="card-body">
                <h5 className="card-title" onClick={handleNavigate} style={{ cursor: 'pointer' }}>Mamut Cervecería</h5>
                <p className="card-text" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
                  Mamut Cervecería se ha consolidado como un referente en la producción de cervezas artesanales, ofreciendo una amplia gama de estilos, como IPAs, stouts y cervezas de temporada. Con un enfoque en la calidad y el sabor, sus productos son elaborados con ingredientes frescos y locales. Además, la cervecería promueve un ambiente acogedor, ideal para compartir con amigos y disfrutar de música en vivo, así como de eventos especiales. También cuentan con promociones atractivas y un menú que incluye opciones gastronómicas para complementar su oferta de cervezas.
                </p>
                <p className="card-text">
                  <small className="text-muted">C. Tercera 8161, Zona Centro, 22000 Tijuana, B.C.</small>
                </p>
              </div>
            </div>
          </div>

          {/* Carrusel 1 */}
          <div className="col-md-6 col-sm-12 mb-3 text-center">
            <div id="carruselCafeteria1" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={foto2Mamut} className="d-block w-100" alt="Cafetería 1-1" />
                </div>
                <div className="carousel-item">
                  <img src={foto1Mamut} className="d-block w-100" alt="Cafetería 1-2" />
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
              <img className="card-img-top" src={foto1Ludica} alt="Café La Esquina" />
              <div className="card-body">
                <h5 className="card-title" onClick={handleNavigate} style={{ cursor: 'pointer' }}>Lúdica Cervecería</h5>
                <p className="card-text" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
                  Lúdica Cervecería se especializa en la producción de cervezas artesanales locales, presentando estilos únicos que no se encuentran en otros lugares. Fomenta la cultura cervecera, ofreciendo un ambiente amigable y relajado para los amantes de la cerveza. Con un horario flexible, es el lugar ideal para explorar nuevas creaciones y disfrutar de una experiencia cervecera auténtica​.
                </p>
                <p className="card-text">
                  <small className="text-muted">Av. Lopez Lucio #4775, López Lucio Col-Int. B, 22106 Tijuana, B.C.</small>
                </p>
              </div>
            </div>
          </div>

          {/* Carrusel 2 */}
          <div className="col-md-6 col-sm-12 mb-3 text-center">
            <div id="carruselCafeteria2" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={foto2Ludica} className="d-block w-100" alt="Cafetería 2-1" />
                </div>
                <div className="carousel-item">
                  <img src={foto1Ludica} className="d-block w-100" alt="Cafetería 2-2" />
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

export default Bares;
