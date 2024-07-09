import mongoose from 'mongoose';
import Implement from './implement.model.js'; // Asegúrate de importar el modelo de implementos

const requestSchema = new mongoose.Schema({
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }],
    implementsRequested: [{
        implementId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'implement'
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
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Aceptado', 'Expirado'],
        default: 'Pendiente'
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 1 * 30 * 1000) // Fecha de expiración
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

requestSchema.post('save', function(req, next) {
    const now = new Date();
    if (req.expiresAt == now && req.status == 'Pendiente') {
        req.status = 'Expirado';
        req.save().then(async () => {
            for (let item of req.implementsRequested) {
                const implement = await Implement.findById(item.implementId);
                if (implement) {
                    implement.stockWaiting -= item.quantity;
                    implement.stock += item.quantity; // Devuelve la cantidad al stock
                    await implement.save();
                }
            }
            next();
        }).catch(next);
    } else {
        next();
    }
});

const Request = mongoose.model('Request', requestSchema);
export default Request;