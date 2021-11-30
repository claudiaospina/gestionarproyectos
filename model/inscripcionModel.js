const { Schema, model } = require('mongoose');

const inscripcion = new Schema({
    idInscripcion: {
        type: String,
        required: true,
        unique: true
    },
    idProyecto: {
        type: String,
        required: true
    },
    identificacion: {
        type: Number,
        required: true
    },
    estadoInscripcion: {
        type: String,
        default: "Pendiente"
    },
    fechaIngreso: {
        type: Date,
        default: new Date()
    },
    fechaEgreso: {
        type: Date,
        default: null
    }
});
module.exports = model('inscripciones', inscripcion);