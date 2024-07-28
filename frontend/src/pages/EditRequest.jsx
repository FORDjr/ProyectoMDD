import Form from '../components/Form';
import Navbar from '../components/Navbar';
import { UpdateRequest } from '../services/request.service';
import { useLocation, useNavigate } from 'react-router-dom';

const EditRequest = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { request } = location.state;

    const modRequest = (data) => {
        UpdateRequest(data, request._id)
            .then(response => {
                console.log("Request updated successfully:", response);
                navigate('/req-all');
            })
            .catch(error => {
                console.error("Error updating request:", error);
            });
    };


    return (
        <>
            <Navbar />
                <div className="form-container">
                <div className="form-wrapper">
                    <Form
                        title="Editar solicitud"
                        fields={[
                            {
                                label: "Nombre de usuario",
                                name: "username",
                                placeholder: request.Nombre || "Renato",
                                type: "text",
                            },
                            {
                                label: "RUT",
                                name: "userRut",
                                placeholder: request.Rut || "XX.XXX.XXX-X",
                                type: "text",
                            },
                            {
                                label: "Implemento",
                                name: "implementName",
                                placeholder: request.Implemento || "Implemento",
                                type: "text",
                            },
                            {
                                label: "Cantidad",
                                name: "quantity",
                                placeholder: request.Cantidad || "Cantidad",
                                type: "number",
                            },
                            {
                                label: "Estado",
                                name: "status",
                                placeholder: request.Estado || "Estado",
                                type: "text",
                            },
                            {
                                label: "Mensaje",
                                name: "message",
                                placeholder: request.Mensaje || "Mensaje",
                                type: "text",
                            },
                        ]}
                        buttonText="Guardar cambios"
                        onSubmit={modRequest}
                    />
                </div>
                </div>
        </>
    );
}

export default EditRequest;