import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { getRequestAll } from '../services/request.service';

const AllRequests = () => {
  const [requests, setRequest] = useState([]);

  const columns = ['Nombre', 'Rut', 'Implemento', 'Cantidad', 'Estado', 'Hora de expiración'];

  const dataRequest = async () => {
    try {
      const response = await getRequestAll();
      
      const formattedData = response.data.map(request => ({
        Nombre: request.username,
        Rut: request.userRut,
        Implemento: request.implementsRequested[0].implementName,
        Cantidad: request.implementsRequested[0].quantity,
        Estado: request.status,
        'Hora de expiración': request.expiresAt?.split('T')[1]
      }));
      setRequest(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    dataRequest();
  }, []);

  const filteredRequests = requests;

  return (
    <>
      <Navbar />
      <div className='main-container'>
      <div className='table-container'>
          <Table columns={columns} data={filteredRequests}/>
        </div>
      </div>
    </>
  );
};

export default AllRequests;
