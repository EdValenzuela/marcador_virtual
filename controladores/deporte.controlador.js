/* IMPORTAMOS EL MODELO */
const Deporte = require('../modelos/deporte.modelo');

/* ================================
FUNCION GET 
================================== */
let mostrarDeporte = (req, res) => {

    //https://mongoosejs.com/docs/api.html#model_Model.find

    Deporte.find({})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    status: 500,
                    mensaje: 'Error en la peticion'
                })
            }

            //Contar la cantidad de registros
            Deporte.countDocuments({}, (err, total) => {
                if (err) {
                    return res.json({
                        status: 500,
                        mensaje: 'Error en la petición'
                    })
                }
                res.json({
                    status: 200,
                    total,
                    data
                })
            });
        })
}

/* EXPORTAMOS LAS FUNCIONES DEL CONTROLADOR */
module.exports = {
    mostrarDeporte
}