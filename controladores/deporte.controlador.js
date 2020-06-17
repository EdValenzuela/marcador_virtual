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

/* ================================
FUNCION BORRAR 
================================== */
let borrarDeporte = (req, res) => {

    //Se captura el ide del deporte de borrar
    let id = req.params.id;


    //https://mongoosejs.com/docs/api.html#model_Model.findById
    Deporte.findById(id, (err, data) => {

        //Validacion de Errores en el proceso
        if (err) {
            return res.json({
                status: 500,
                mensaje: "Error en el servidor",
                err
            })
        }
        //Se valida si el id existe en la BD
        //Si no hay data retorno otro mensaje
        if (!data) {
            return res.json({
                status: 400,
                mensaje: "El Slide no existe en la Base de datos"
            })
        }

        //Luego de pasar esas validaciones se borra el registro en MONGODB
        //https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
        Deporte.findByIdAndRemove(id, (err, data) => {
            if (err) {
                return res.json({
                    status: 500,
                    mensaje: "Error al borrar el deporte",
                    err
                })
            }
            res.json({
                status: 200,
                mensaje: "El deporte se borro correctamente"
            })
        })
    })

}

/* EXPORTAMOS LAS FUNCIONES DEL CONTROLADOR */
module.exports = {
    mostrarDeporte,
    borrarDeporte
}