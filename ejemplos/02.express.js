//Requerimientos
const express = require('express');

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
    SALIDA DEL PUERTO
*/
app.listen(4000, () => {
    console.log("Habilitado el puerto 4000");
})