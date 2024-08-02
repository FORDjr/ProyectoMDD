import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { getRequestAll, deleteRequest, acceptRequest, expireRequest } from '../services/request.service';


const AllRequests = () => {
  const [requests, setRequest] = useState([]);
  const navigate = useNavigate();
  
  const columns = ['Nombre', 'Rut', 'Implemento', 'Cantidad', 'Estado', 'Mensaje', 'Hora de expiración', 'Acción'];

  const dataRequest = async () => {
    try {
      const response = await getRequestAll();
      
      const formattedData = response.data.map(request => ({
        _id: request._id,
        Nombre: request.username,
        Rut: request.userRut,
        Implemento: request.implementsRequested[0].implementName,
        Cantidad: request.implementsRequested[0].quantity,
        Estado: request.status,
        Mensaje: request.message,
        'Hora de expiración': request.expiresAt?.split('T')[1],
      }));
      setRequest(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    dataRequest();
  }, []);

  const handleAccept = async (data) => {
    const request = requests.find(r => r._id === data);
    if(request.Estado === 'Expirado'){
      Swal.fire('Error', 'La solicitud ha expirado', 'error');
      return;
    }
    try {
      await acceptRequest(data);
      dataRequest(); // Actualiza la tabla
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  

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
    if (result.isConfirmed) {
      try {
        await deleteRequest(id);
        dataRequest(); //Actualiza la tabla
        Swal.fire('Eliminado!', 'La solicitud ha sido eliminada.', 'success');
      } catch (error) {
        console.error("Error: ", error);
      }
  }
  };

  const handleEdit = async (id) => {
    const request = requests.find(r => r._id === id);
    navigate(`/req-all/edit/${id}`, { state: { request } });
  };

  const handleExpire = async(id) => {
    if(checkExpired(id)){
      try {
        await expireRequest(id, {
          status: 'Expirado',
        });
        Swal.fire('Expirado!', 'La solicitud ha sido expirada.', 'success');
        dataRequest(); // Actualiza la tabla
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  }

  const checkExpired = (id) => {
    const request = requests.find(r => r._id === id);
    const requestStatus = request.Estado;
    if(requestStatus === 'Expirado'){
      Swal.fire('Error', 'La solicitud ya ha expirado', 'error');
      return false;
    }
    if(requestStatus === 'Aceptado'){
      Swal.fire('Error', 'La solicitud ya ha sido aceptada', 'error');
      return false;
    }
    return true;
  }

  const filteredRequests = requests;

  return (
    <>
      <Navbar />
      <div className='main-container'>
      <div className='table-container'>
          <Table columns={columns} 
          data={filteredRequests} 
          onDelete={handleDelete}
          onEdit={handleEdit}
          onAccept={handleAccept} 
          onExpire={handleExpire}
          />
        </div>
      </div>
    </>
  );
};

export default AllRequests;
