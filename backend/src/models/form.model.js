import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
},
{
        versionKey: false,
        timestamps: {
        createdAt: 'createdAt',
        updateAt: 'updateAt'
        },
    
})

export default mongoose.model('Form', formSchema);

/*REQUERIMIENTO FUNCIONAL
    Usuario puede crear una peticion para pedir un equipamiento deportivo (createForm)
    Ver su peticion (getForm)
    Si el usuario desea actualizar tu peticion (updateForm)
    El usuario se arrepiente o se equivoco puede eliminar la peticion (deleteForm)
*/