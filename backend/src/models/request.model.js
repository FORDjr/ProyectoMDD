//El usuario puede ver disponibilidad, crear una peticion de implemento, eliminar una peticion de implemento 
//y puede editar su peticion de implemento utilizando sus credenciales de alumno
import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    name: {
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
    // Implementos solicitados con la cantidad 
    implementsRequested: [{
        implementId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Implement' // Asume que tienes un modelo 'Implement'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    message: {
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

// Función para validar la disponibilidad y el stock de los implementos solicitados
requestSchema.pre('save', async function(next) {
    for (let item of this.implementsRequested) {
        const implement = await mongoose.model('Implement').findById(item.implementId);
        if (!implement || implement.stock < item.quantity) {
            throw new Error(`El implemento ${implement.name} no está disponible o no tiene suficiente stock.`);
        }
    }
    next();
});

export default mongoose.model('request', requestSchema);
