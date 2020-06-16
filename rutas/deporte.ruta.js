const express = require('express');
const app = express();

/* IMPORTAMOS EL CONTROLADOR */
const Deporte = require('../controladores/deporte.controlador');

/* CREAMOS LAS RUTAS HTTP */

app.get('/mostrar-deporte', Deporte.mostrarDeporte);

/* EXPORTAMOS LA RUTA */
module.exports = app;