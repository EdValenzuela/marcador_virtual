//Requerimientos
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

/*
    ESQUEMA PARA EL MODELO CONECTOR A MONGODB
*/
let Schema = mongoose.Schema;
let deporteSchema = new Schema({
    tipo_marcador: {
        type: String,
        require: [true, "El tipo de marcador es obligatorio"]
    },
    torneo: {
        type: String,
        require: false
    }
})

const Deporte = mongoose.model("deportes", deporteSchema);

/* ================================
PETICIONES GET 
================================== */
app.get('/', (req, res) => {

    //https://mongoosejs.com/docs/api.html#model_Model.find

    Deporte.find({})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    status: 500,
                    mensaje: 'Error en la peticion'
                })
            }
            res.json({
                status: 200,
                data
            })

        })
})

/* ================================
PETICIONES POST 
================================== */
app.post('/crear-deporte', (req, res) => {

    //https://mongoosejs.com/docs/api.html#model_Model.find

    let deporte = req.body;

    res.json({
        deporte
    })

})

/* ================================
PETICIONES PUT 
================================== */
app.put('/editar-deporte/:id', (req, res) => {

    //https://mongoosejs.com/docs/api.html#model_Model.find

    let id = req.params.id;

    res.json({
        id
    })

})

/* ================================
PETICIONES DELETE 
================================== */
app.delete('/borrar-deporte/:id', (req, res) => {

    //https://mongoosejs.com/docs/api.html#model_Model.find

    let id = req.params.id;

    res.json({
        id
    })

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