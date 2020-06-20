/* ESQUEMA PARA EL MODELO CONECTOR A MONGODB */
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
//let jugador = new Schema({ any: [Schema.Types.Mixed] });
/*var nombres = new Schema({ any: [] });
var edad = new Schema({ any: [] });
var pais = new Schema({ any: [] });
var ranking_atp = new Schema({ any: [] });*/

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
        type: String,
        required: false
    },
    jugador: [{
        nombre_jugador: { type: String, default: '' },
        edad: { type: Number, default: '' },
        pais: { type: String, default: ''},
        ranking_atp: { type: String, default: ''}
    }]
    /*jugador: [{
            nombre_jugador: {
                type: String,
                required: false
            },
            edad: {
                type: Number,
                required: false
            },
            pais: {
                type: String,
                required: false
            },
            ranking_atp: {
                type: Number,
                required: false
            }
        }]*/
        /*jugador: [{
            nombre_jugador: String,
            edad: Number,
            pais: String,
            ranking_atp: Number
        }]*/

    //jugador: [{ nombre_jugador: String, edad: Number, pais: Number, ranking_atp: Number }]
    //jugador: [{ body: Array }],
    /*jugador: [{
            0: {
                "nombre_jugador": String,
                "edad": Number,
                "pais": String,
                "ranking_atp": Number
            },
            1: {
                "nombre_jugador": String,
                "edad": Number,
                "pais": String,
                "ranking_atp": Number
            }
        }]*/
    /*jugador: [{
        nombre_jugador: String,
        edad: Number,
        pais: String,
        ranking_atp: String
    }]*/

    /*jugador: {
        type: Array,
        require: true
    }*/
    //jugador: [Array]
});

//console.log(deporteSchema);

/* EXPORTAMOS EL MODELO PARA SER LLAMADO EN OTRA CARPETA */
module.exports = mongoose.model("deportes", deporteSchema);