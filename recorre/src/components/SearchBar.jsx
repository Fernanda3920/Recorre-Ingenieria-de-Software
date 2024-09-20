import React, { useState, useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ onSearch, value }) => {
  const [query, setQuery] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
    }
  };

  // Actualiza el valor del campo de búsqueda cuando cambia la dirección (prop value)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <form
      className="d-flex justify-content-center"
      onSubmit={handleSubmit}
      style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: '80%',
        maxWidth: '600px',
      }}
    >
      <input
        type="text"
        className="form-control me-2 bg-dark text-white"
        placeholder="Buscar ubicación..."
        aria-label="Search"
        value={query} // Aquí se refleja el valor de la dirección
        onChange={(e) => setQuery(e.target.value)} // Permite la edición manual
        style={{
          border: '1px solid #555',
        }}
      />
      <button className="btn btn-outline-light" type="submit">
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default SearchBar;
