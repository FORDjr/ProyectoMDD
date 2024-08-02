// Se importa el módulo de 'mongoose'
import mongoose from 'mongoose';

const implementSchema = new mongoose.Schema({
    name: {//nombre del implemento
        type: String,
        required: true
    },
    description: {//descripcion del implemento
        type: String,
        required: true
    },
    stock: {//cantidad de implementos
        type: Number,
        required: true //5
    },
    stockWaiting: {//cantidad de implementos esperando (10 minutos)
        type: Number,
        required: false // 3
    },
    stockAccepted: {//cantidad de implementos entregados
        type: Number,
        required: false // 2
    },
    status: {//estado del implemento
        type: String,
        required: false,
        enum: ['disponible', 'no disponible']
    },
    category: {//categoria del implemento por ejemplo: futbol, basquetbol, tenis
        type: String,
        required: true,
        enum: ['futbol', 'basquetbol', 'tenis', 'otros' ]//!agregar mas categorias
    }
}, 
{
        versionKey: false,//se agrega la versionKey
        timestamps: {//se agrega la fecha de creacion y actualizacion
        createdAt: 'createdAt',
        updateAt: 'updateAt'
        },


});

const Implement = mongoose.model('Implement', implementSchema);
export default Implement;

//historial de lo que pide un usuario
//quien soy
//el implemento
//pregunto si se encuentran disponible con el findone y si el contador el mayor a 0 restarle un y prestar la pelota
