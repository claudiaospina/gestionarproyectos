const {Schema, model} = require('mongoose');

const proyecto = new Schema({
    idProyecto: {
        type: Number,
        required: true,
        unique: true
    },
    nombreProyecto: {
        type: String,
        required: true,
        unique: true
    },
    objetivosGenerales: {
        type: String,
        required: true
    },
    objetivosEspecificos: {
        type: String,
        required: true
    },
    presupuesto: {
        type: Number,
        required: true
    },
    fechaInicio: {
        type: Date,
        default: new Date()
    },
    fechaTerminacion: {
        type: Date,
        default: null        
    },
    nombreLider: {
        type: String,
        required: true
    },
    idLider: {
        type: Number,
        required: true
    },
    facultad: {
        type: String,
        required: true
    },
    proyectoActivo: {
        type: Boolean,
        default: false,
    },
    faseProyecto: {
        type: String,
        required: true,
        default: null
    },
    integrantes: [Number]
})

module.exports= model('proyectos', proyecto)