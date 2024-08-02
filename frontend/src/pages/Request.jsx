import { useState, useEffect } from "react";
import axios from '../services/root.service';
import Navbar from "../components/Navbar";
import { profile } from "../services/auth.service";
import { useLocation } from 'react-router-dom';

const Request = () => {
  const [rut, setRut] = useState('');
  const [implementId, setImplementId] = useState('');
  const [quantity, setQuantity] = useState(1); 
  const [message, setMessage] = useState('');
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/request', {
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

  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    rut: '',
    rolName: ''
  });

  useEffect(() => {
    async function dataProfile(){  
      try {
        const { data } = await profile();
        setUserProfile(data);
        setRut(data.rut); // Asegúrate de que el estado rut se actualiza con el valor de userProfile.rut
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    dataProfile();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get('implementId');
    if (id) {
      setImplementId(id);
    }
  }, [location]);

  return (
    <div className="request-container">
      <Navbar />
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="rut">RUT:</label>
        <input
          type="text"
          id="rut"
          value={userProfile.rut} // Utiliza el estado rut en lugar de userProfile.rut
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