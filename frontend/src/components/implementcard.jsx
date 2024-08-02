import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import pelota from '../images/pelota.png';
import basquet from '../images/basquet.png';
import raqueta from '../images/raqueta.png';
import peto from '../images/peto.png';
import { deleteImplement } from '../services/implements.service';

const ImplementCard = ({ data }) => {
  const [implement, setImplement] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const navigate = useNavigate();
  const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
  const userRole = storedUser?.data?.rolName;

  const images = [pelota, peto, basquet, raqueta]; //importadas a 500x500

  useEffect(() => {
    if (data && data.data) {
      setImplement(data.data);
      const initialVisibility = data.data.reduce((acc, item) => {
        acc[item._id] = false;
        return acc;
      }, {});
      setShowDetails(initialVisibility);
    }
  }, [data]);
  
  const handleRequestClick = (id) => {
    navigate(`/request?implementId=${id}`);
  };

  // Función para manejar la visibilidad
  const toggleDetails = (id) => {
    setShowDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Función para manejar la eliminación
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',       
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar',
    });
    if(result.isConfirmed){
      try{
        await deleteImplement(id);
        const confirmation = await Swal.fire({
          title: 'Implemento eliminado exitosamente!',
          icon: 'success',
        });
        if(confirmation.isConfirmed){
          window.location.replace('');
        }
      }catch (error) {
        console.error("Error al eliminar el implemento:", error);
      }
    }
  };


  const handleEdit = (id) => {
    navigate(`/implement/edit?implementId=${id}`);
  }

  return (
    <div className="implement-card">
      {implement.map((implement, index) => (
        <div key={implement._id} className="box">
          <div className="card">
            <div className="image">
              <img src={images[index % images.length]} alt={implement.name} />
            </div>
            <div className="description">
              <h1>{implement.name}</h1> 
              <h1>{`DISPONIBLE: ${implement.stock}`}</h1>
              <h1>{implement.category}</h1>
              <button onClick={() => handleRequestClick(implement._id)}>Pedir</button>
              <button onClick={() => toggleDetails(implement._id)}>Detalles</button>
              {((userRole==='administrador')||(userRole==='encargado'))&&(<button onClick={() => handleEdit(implement._id)}>Editar</button>)}
              {(userRole==='administrador')&&(<button onClick={() => handleDelete(implement._id)}>Eliminar</button>)}
              {showDetails[implement._id] && (
                <>
                  <h2>{`ID: ${implement._id}`}</h2>
                  <h2>{`DESCRIPCION: ${implement.description}`}</h2>
                  <h2>{`ESTADO: ${implement.status}`}</h2>
                  <h2>{`EN ESPERA: ${implement.stockWaiting}`}</h2>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImplementCard;
