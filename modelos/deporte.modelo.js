/* ESQUEMA PARA EL MODELO CONECTOR A MONGODB */
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let deporteSchema = new Schema({
        tipo_marcador: {
            type: String,
            require: [true, "El tipo de marcador es obligatorio"]
        },
        torneo: {
            type: String,
            require: false
        },
        lugar: {
            type: String,
            required: false
        },
        etapa: {
            type: String,
            required: false
        },
        tipo_cancha: {
            type: String,
            required: false
        },
        fecha: {
            type: Date,
            required: false
        },
        jugador: {
            type: Array,
            require: [true, "Los jugadores son obligatorios"]
        }
    })
    /* EXPORTAMOS EL MODELO PARA SER LLAMADO EN OTRA CARPETA */
module.exports = mongoose.model("deportes", deporteSchema);