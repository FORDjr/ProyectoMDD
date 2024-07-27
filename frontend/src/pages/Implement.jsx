/*
import React, { useState, useEffect } from 'react';
import axios from '../services/root.service'; 
import Navbar from '../components/Navbar';
import ImplementItem from '../components/ImplementItem'; 

const Implement = () => {
  const [implementsList, setImplementsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImplements = async () => {
      try {
        const response = await axios.get('/impledment'); // Asegúrate de que la URL sea correcta
        console.log('Datos obtenidos:', response.data); 
        setImplementsList(response.data);
      } catch (error) {
        console.error('Error al obtener los implementos:', error);
        setError('Error al obtener los implementos');
      }
    };
    fetchImplements();
  }, []);

  if (error) {
    return (
      <div className="implement-container">
        <Navbar />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="implement-container">
      <Navbar />
      <h1>Aquí se ven todos los implementos</h1>
      <div className="implement-list">
        {implementsList.length === 0 ? (
          <p>No hay implementos disponibles.</p>
        ) : (
          implementsList.map((implement) => (
            <ImplementItem
              key={implement._id}
              name={implement.name}
              id={implement._id}
              quantity={implement.quantity}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Implement;
*/


import React from 'react';
import axios from '../services/root.service'; 
import Navbar from '../components/Navbar';
import ImplementCard from '../components/implementcard'; 

const Implement = () => {

return (
    <div className="implement-container">
      <Navbar />
      <ImplementCard />
    </div>
  );
};

export default Implement;
