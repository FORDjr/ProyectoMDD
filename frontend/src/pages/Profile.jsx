import Form from "../components/Form";
import Navbar from "../components/Navbar";
import { profile } from "../services/auth.service";
import { useState, useEffect } from "react";
import Table from '../components/Table';
import { getOwnRequests } from "../services/request.service";

const Profile = () => {
  const [requests, setRequest] = useState([]);
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    rut: '',
    rolName: ''
  });
  const columns = ['Implemento', 'Cantidad', 'Estado', 'Mensaje'];
  
  const dataRequest = async () => {
    try {
      const response = await getOwnRequests();
      
      const formattedData = response.data.map(request => ({
        Implemento: request.implementsRequested[0].implementId.name,
        Cantidad: request.implementsRequested[0].quantity,
        Estado: request.status,
        Mensaje: request.message,
      }));
      console.log(response);


      setRequest(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  
  useEffect(() => {
    async function dataProfile(){  
      try {
        const { data } = await profile();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    dataProfile();
    dataRequest();
  }, []);
  
  const filteredRequests = requests;
  
  return (
    <main className="profile_page">
      <Navbar />
      <div className="sections">
        <img className="profile_image" src="profile.png" alt="Imagen de perfil" />
        <div className="form">
        <Form
          backgroundColor="#FFFFFF"
          title="Perfil"
          fields={[
            {
              label: "Nombre de usuario",
              name: "username",
              type: "text",
              value: userProfile.username,
              disabled: true,
            },
            {
              label: "Correo electrónico",
              name: "email",
              type: "email",
              value: userProfile.email,
              disabled: true,
            },
            {
              label: "RUT",
              name: "rut",
              type: "text",
              value: userProfile.rut,
              disabled: true,
            },
            {
              label: "Rol",
              name: "role",
              type: "text",
              value: userProfile.rolName,
              disabled: true,
            },
          ]}
        />
        
        </div>
        

      </div>
      <main className="profile_table">
        <h1 style={
         
         {color:'#003366',marginLeft: '53vh' }
          
          }>
          Historial
        </h1>
      <Table columns={columns} 
          data={filteredRequests} 
          />

      </main>
      

    </main>
    
  );
};

export default Profile;
