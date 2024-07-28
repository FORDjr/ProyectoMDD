import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { getRequestAll, deleteRequest, acceptRequest } from '../services/request.service';


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

  const handleAccept = async (data) => {
    try {
      await acceptRequest(data);
      dataRequest();
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  useEffect(() => {
    dataRequest();
  }, []);

  const handleDelete = async (id) => {
    try{
      await deleteRequest(id);
      dataRequest();
    }catch(error){
      console.error("Error: ", error);
    }
  };

  const handleEdit = async (id) => {
    const request = requests.find(r => r._id === id);
    navigate(`/edit-request/${id}`, { state: { request } });
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
          />
        </div>
      </div>
    </>
  );
};

export default AllRequests;
