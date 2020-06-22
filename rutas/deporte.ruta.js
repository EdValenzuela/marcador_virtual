const express = require('express');
const app = express();

/* IMPORTAMOS EL CONTROLADOR */
const Deporte = require('../controladores/deporte.controlador');

/* CREAMOS LAS RUTAS HTTP */

app.get('/mostrar-deporte', Deporte.mostrarDeporte);
app.post('/crear-deporte', Deporte.crearDeporte);
app.put('/editar-deporte/:id', Deporte.editarDeporte);
app.delete('/borrar-deporte/:id', Deporte.borrarDeporte);

/* EXPORTAMOS LA RUTA */
module.exports = app;