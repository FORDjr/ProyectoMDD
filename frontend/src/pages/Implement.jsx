
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ImplementCard from '../components/implementcard'; 
import getImplements from '../services/implements.service.js';
import { useNavigate } from 'react-router-dom';

function App() {
  const [implement, setImplement] = useState([]);
  const navigate = useNavigate();
  const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
  const userRole = storedUser?.data?.rolName;

  useEffect(() => {
    const implementSubmit = async () => {
      const dataImplement = await getImplements();
      setImplement(dataImplement);
    };
    implementSubmit();
  }, []);

  return (
    <div className="implement-container">
      <Navbar />
       {(userRole==='administrador' || userRole === 'encargado') && (
        <div className='implement-buttons'>
          <button 
            onClick={() => navigate("/implement/create")}
            style={{marginRight: '2vh'}}
          >Crear Implemento</button>
          <button onClick={() => navigate("/implement/edit")}>Editar Implemento</button>
        </div>)
       }
      <ImplementCard data={implement} />

    </div>
  );
}

export default App;

