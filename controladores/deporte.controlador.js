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
    //console.log("destructuracion =>", req.body);

    req.body.forEach(function(obj) {
        //Obtengo los datos del formulario para pasarlos al modelo
        let deporte = new Deporte({
            tipo_marcador: obj.tipo_marcador,
            torneo: obj.torneo,
            lugar: obj.lugar,
            etapa: obj.etapa,
            tipo_cancha: obj.tipo_cancha,
            fecha: obj.fecha,
            jugador: obj.jugador
        });
        //console.log("deporte", deporte);
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
    });
}

/* ================================
FUNCION PUT 
================================== */
let editarDeporte = (req, res) => {

    //Capturo el id del deporte a actualizar
    let id = req.params.id;

    //Obtenemos el cuerpo del formulario
    let body = req.body;

    /* ================================
    1.- SE VALIDA QUE EL DEPORTE EXISTA 
    ================================== */
    //https://mongoosejs.com/docs/api.html#model_Model.findById
    Deporte.findById(id, (err, data) =>{
        if(err){
            return res.json({
                status: 500,
                mensaje:'Error en el servidor',
                err
            })
        }

        if(!data){
            return res.json({
                status: 400,
                mensaje:'El deporte no existe en la base de datos',
                err
            })
        }

         /* ================================
        2.- SE VALIDA QUE HAYA CAMBIOS  
        ================================== */


        /* ================================
        3.- SE ACTUALIZA LOS CAMBIOS  
        ================================== */
        let datosDeporte = {
            tipo_marcador: body.tipo_marcador,
            torneo: body.torneo,
            lugar: body.lugar,
            etapa: body.etapa,
            tipo_cancha: body.tipo_cancha,
            fecha: body.fecha,
            jugador: body.jugador
        }

        //ACTUALIZAMOS EN MONDODB
        Deporte.findByIdAndUpdate(id, datosDeporte, {new:true, runValidators:true}, (erro, data)=>{
            if(err){
                return res.json({
                    status: 400,
                    mensaje:'Error al editar el deporte',
                    err
                })
            }

            res.json({
                status:200,
                data,
                mensaje: 'El deporte se actualizo con exito'
            })
        })
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
    crearDeporte,
    editarDeporte,
    borrarDeporte
}