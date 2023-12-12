import React, { useState } from 'react';
import './Search.css'; 

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Aquí puedes manejar la lógica de búsqueda, por ejemplo, enviar el término de búsqueda a una API
    console.log('Realizar búsqueda con: ' + searchTerm);
  };

  return (
    <header className="main-header">
    <div className="custom-container">
      <h1 className="logo">Discover Pacific</h1>
      {/* <UserMenu/> */}
      <div className="custom-search-box">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       
      </div>
    </div>
  </header>
  );
};

export default Search;
