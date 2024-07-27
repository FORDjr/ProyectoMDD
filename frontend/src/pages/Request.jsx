import React, { useState } from 'react';
import axios from '../services/root.service';
import Navbar from "../components/Navbar";

const Request = () => {
  const [rut, setRut] = useState('');
  const [implementId, setImplementId] = useState('');
  const [quantity, setQuantity] = useState(1); 
  const [message, setMessage] = useState('');

  //* ///////////////////////////////////////////////////////////////// GPT xd 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const peticion = await axios.post('/request', {
        userRut: rut,
        implementsRequested: [
          {
            implementId: implementId,
            quantity: quantity, 
          },
        ],
        message: message,
      });
      alert('Petición creada exitosamente');
    } catch (error) {
      alert('Error al crear la petición: ' + error.message);
    }
  };
  //* /////////////////////////////////////////////////////////////////
  return (
    
      <div className="request-container">
      <Navbar />
      <h1>Formulario epico</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rut">RUT:</label>
        <input
          type="text"
          id="rut"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          required
        />
        <label htmlFor="implementId">ID del Implemento:</label>
        <input
          type="text"
          id="implementId"
          value={implementId}
          onChange={(e) => setImplementId(e.target.value)}
          required
        />
        <label htmlFor="quantity">Cantidad:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          max="5"
          min="1"
        />
        <label htmlFor="message">Mensaje:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Solicitar</button>
      </form>
    </div>
  );
};

export default Request;
