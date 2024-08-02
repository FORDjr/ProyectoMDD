import Form from '../components/Form';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';
import { UpdateRequest } from '../services/request.service';
import { useLocation, useNavigate } from 'react-router-dom';

const EditRequest = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { request } = location.state;

    const modRequest = (data) => {
        // Mostrar el cuadro de diálogo de confirmación
        Swal.fire({
        title: "¿Quieres guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: "No guardar",
        }).then((result) => {
        if (result.isConfirmed) {
            // Si se confirma, proceder con la actualización de la solicitud
            UpdateRequest(data, request._id)
            .then((response) => {
                console.log("Solicitud actualizada con éxito:", response);
                Swal.fire("Guardado", "", "success").then(() => {
                navigate('/req-all');
                });
            })
            .catch((error) => {
                console.error("Error al actualizar la solicitud:", error);
                Swal.fire("Error", "Error al actualizar la solicitud", "error");
            });
        } else if (result.isDenied) {
            Swal.fire("Los cambios no se han guardado", "", "info");
        }
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
                                disabled: true,
                            },
                            {
                                label: "RUT",
                                name: "userRut",
                                placeholder: request.Rut || "XX.XXX.XXX-X",
                                type: "text",
                                disabled: true,
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
                                //Poner estado para seleccionar Pendiente, Aceptado o Rechazado¿?
                                label: "Estado",
                                name: "status",
                                placeholder: request.Estado || "Estado",
                                type: "text",
                                disabled: true,
                            },
                            {
                                //Poner el mensaje como opcional
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