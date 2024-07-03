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
        required: true
    },
    status: {//estado del implemento
        type: String,
        required: true,
        enum: ['disponible', 'no disponible']
    },
    category: {//categoria del implemento por ejemplo: futbol, basquetbol, tenis
        type: String,
        required: true,
        enum: ['futbol', 'basquetbol', 'tenis' ]//!agregar mas categorias
    }
},

{
        versionKey: false,//se agrega la versionKey
        timestamps: {//se agrega la fecha de creacion y actualizacion
        createdAt: 'createdAt',
        updateAt: 'updateAt'
        },


});


export default mongoose.model('Implement', implementSchema);