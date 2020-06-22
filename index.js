//Requerimientos

require('./config.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/*
    Creamos una variable para tener todas las funcionalidades de Express
*/
const app = express();

/*
    MIDDLEWARE PARA BODY PARSER
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/* IMPORTAMOS LAS RUTAS */
app.use(require('./rutas/deporte.ruta'));
//Aquí esta la conexion entre modelo>controlador>rutas

/* CONEXION A LA BD */
mongoose.connect('mongodb://localhost:27017/marcador_virtual', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, resp) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});


/* SALIDA DEL PUERTO HTTP */
app.listen(process.env.PORT, () => {
    console.log(`Habilitado el puerto ${process.env.PORT}`);
})