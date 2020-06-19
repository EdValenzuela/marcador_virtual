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
FUNCION POST 
================================== */
let crearDeporte = (req, res) => {

    //https://mongoosejs.com/docs/api.html#model_Model-save

    //Obtengo los datos del cuerpo del formulario

    const { tipo_marcador, torneo, lugar, etapa, tipo_cancha, fecha, jugador } = req.body;
    console.log("destructuracion =>", req.body);

    //Obtengo los datos del formulario para pasarlos al modelo
    let deporte = new Deporte({
        tipo_marcador: req.body.tipo_marcador,
        torneo: req.body.torneo,
        lugar: req.body.lugar,
        etapa: req.body.etapa,
        tipo_cancha: req.body.tipo_cancha,
        fecha: req.body.fecha,
        jugador: req.body.jugador
        /*jugador: [{
                sss: req.body.jugador,
                ssssss: req.body.jugador
            }]*/
            /*jugador: [{
                nombre_jugador: req.body.jugador.nombre_jugador,
                edad: this.jugador.edad,
                pais: this.jugador.pais,
                ranking_atp: this.jugador.ranking_atp
            }],*/


    });
    console.log("deporte", deporte);



    deporte.save((err, data) => {

        if (err) {
            return res.json({
                status: 400,
                mensaje: 'Error al almacenar el deporte',
                err
            })
        }

        res.json({
            status: 200,
            data,
            mensaje: 'Deporte creado con exito'
        })
    });


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
    crearDeporte,
    borrarDeporte
}