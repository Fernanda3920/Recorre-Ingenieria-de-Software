// SearchBar.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
    }
  };

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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          border: '1px solid #555',
        }}
      />
      <button className="btn btn-outline-light" type="submit">
      <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default SearchBar;
