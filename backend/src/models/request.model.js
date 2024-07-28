import mongoose from 'mongoose';
import Implement from './implement.model.js'; // Importar el modelo de implemento

const requestSchema = new mongoose.Schema({
    userRut: {
        type: String,
        required: true,
        ref: 'User'
    },
    implementsRequested: [{
        implementId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Implement'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    message: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Aceptado', 'Expirado'],
        default: 'Pendiente'
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 2 * 60 * 1000) // Fecha de expiración, 2 minutos
    }
},
{
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

requestSchema.pre('save', async function(next) {
    try {
        for (let item of this.implementsRequested) {
            const implement = await Implement.findById(item.implementId);
            if (!implement || implement.stock < item.quantity) {
                throw new Error(`El implemento ${implement.name} no está disponible o no tiene suficiente stock.`);
            } else {
                implement.stock -= item.quantity;
                implement.stockWaiting += item.quantity; // Incrementa stockWaiting
                await implement.save();
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Request = mongoose.model('Request', requestSchema);
export default Request;