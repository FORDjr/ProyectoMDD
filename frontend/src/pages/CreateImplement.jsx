import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Form from '../components/Form';
import Navbar from '../components/Navbar';
import { createImplement } from '../services/implements.service';


const CreateImplement = () => {

    const navigate = useNavigate();

    const envioRegistro = async (data) => {
        console.log(data);
        try {
            createImplement(data);
            Swal.fire({
                title: 'Implemento creado exitosamente!',
                icon: 'success',
              });
            navigate('/implement');
        } catch (error) {
            alert('Error al crear el implemento: ' + error.message);
        }
    }

    return(
        <div className="create-container">
            <Navbar />
            
            <Form
                title="Crear Implemento"
                fields={[
                    {
                        
                        label: 'Nombre',
                        name: 'name',
                        placeholder: 'Nombre del implemento',
                        type: 'text',
                        
                        required: true
                        
                    },
                    {
                        label: 'Descripción',
                        name: 'description',
                        placeholder: 'Descripción del implemento',
                        type: 'text',
                        
                        required: true
                    },
                    {
                        label: 'Cantidad',
                        name: 'stock',
                        placeholder: 'Cantidad de implementos',
                        type: 'number',
                        
                        required: true
                    },
                    {
                        label: 'Categoria',
                        name: 'category',
                        placeholder: 'Categoria del implemento',
                        type: 'text',
                        required: true
                    }
                ]}
                buttonText="Crear"
                onSubmit={envioRegistro}
            />
        </div>
    );
}

export default CreateImplement;
