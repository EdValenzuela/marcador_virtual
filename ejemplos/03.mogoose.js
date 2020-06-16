//Requerimientos
const express = require('express');
const mongoose = require('mongoose');

/*
    Creamos una variable para tener todas las funcionalidades de Express
*/
const app = express();

/*
    PETICIONES GET
*/
app.get('/', (req, res) => {
    let salida = {
        nombre: "hola mundo",
        url: req.url
    }
    res.send(salida);
})

/*
    CONEXION A LA BD
*/
mongoose.connect('mongodb://localhost:27017/marcador_virtual', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, resp) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});


/*
    SALIDA DEL PUERTO
*/
app.listen(4000, () => {
    console.log("Habilitado el puerto 4000");
})