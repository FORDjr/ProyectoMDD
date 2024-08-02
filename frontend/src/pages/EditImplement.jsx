import Form from '../components/Form';
import Navbar from '../components/Navbar';
import { editImplement } from '../services/implements.service';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const EditImplement = () => {
    const [implementId, setImplementId] = useState('');
    const location = useLocation();

    const envioRegistro =  async (data) => {
        console.log(data);
        try {
            await editImplement(data, implementId);
            alert('Implemento editado exitosamente');
        } catch (error) {
            alert('Error al editar el implemento: ' + error.message);
        }
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const id = query.get('implementId');
        if (id) {
            setImplementId(id);
        }
    }, [location]);


    const handleIdChange = (e) => {
        setImplementId(e.target.value);
    };

    return(
        <div className="edit-container">
            <Navbar />
            <Form
                title="Editar Implemento"
                fields={[
                    {
                        label: 'ID',
                        name: 'id',
                        placeholder: 'ID del implemento',
                        value: implementId,
                        onChange: handleIdChange,
                        type: 'text',
                        required: true,
                        
                    },
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
                buttonText="Editar"
                onSubmit={envioRegistro}
            />
        </div>
    )
}

export default EditImplement;