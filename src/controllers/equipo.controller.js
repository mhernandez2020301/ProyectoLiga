const Equipo = require('../models/equipo.model');
const Liga = require('../models/liga.model');

function CrearEquipo(req,res){
    var parametros = req.body;
    var modelEquipo = new Equipo();
    var idUsuario;
    if (req.user.rol == "USUARIO") { 
        idUsuario = req.user.sub;
    } else if (req.user.rol == "ADMIN") {
        if (req.params.idUsuario == null) {
            return res.status(500).send({ mensaje: "Envíe el usuario en ruta :3"});
        } idUsuario = req.params.idUsuario }
    Equipo.findOne({idUsuario: idUsuario, nombre: parametros.nombre},(err, equipoEncontrado) => {
        if(equipoEncontrado){
            res.status(500).send({ mensaje: "El equipo ya existe :(" })
        } else{
            if(parametros.liga == null)   return res.status(500).send({ mensaje: "Escriba el nombre de la liga a la que quiere inscribirse :)" });
            Liga.findOne({nombre: parametros.liga},(err,ligaEncontrada) => {
                if(ligaEncontrada == null){ res.status(500).send({ mensaje: "No existe la Liga :c" })
                } else{
                    Equipo.find({idLiga: ligaEncontrada._id},(err, equiposEncontrados) => {
                        if(equiposEncontrados.length < 10){
                            if(parametros.nombre){
                                modelEquipo.nombre = parametros.nombre
                                modelEquipo.golesFavor = 0;
                                modelEquipo.golesContra = 0;
                                modelEquipo.diferenciaGoles = 0;
                                modelEquipo.partidosJugados = 0;
                                modelEquipo.puntos = 0;
                                modelEquipo.idUsuario = idUsuario;
                                modelEquipo.idLiga = ligaEncontrada._id;
                
                                modelEquipo.save((err, equipoCreado)=>{
                                    if (err) return res.status(500).send({ mensaje: "Error en la peticion :/" });
                                    if (!equipoCreado)
                                        return res.status(500).send({ mensaje: "Error al crear el equipo :c" });
                                        return res.status(200).send({ equipo: equipoCreado });
                                })
                            } else {
                                return res.status(500).send({ mensaje: "Debe poner el nombre de el equipo que desea crear :3" });
                            }
                        }else{
                            return res.status(500).send({ mensaje: "Se ha llegado al límite de equipos, suerte el próximo año ;)" });
                        }
                    })
                }
            })
        }
    })
} 

function Eliminar (req,res){
    var idUsuario;
    nombreEquipo= req.params.nombre
    if(req.params.nombre==null) return res.status(500).send({error: "debe enviar el nombre del equipo que eliminará"})

    if (req.user.rol == "Usuario") {
        idUsuario = req.user.sub;
    } else if (req.user.rol == "ADMIN") {
        if (req.params.idUsuario == null) {
            return res.status(500).send({
                mensaje: "envie el usuario",
            });
        } idUsuario = req.params.idUsuario }
    Equipo.findOneAndDelete({nombre:req.params.nombre, idUsuario: idUsuario}, {nombre:req.body.nombre}, (err, equipoEditado) => {
        if (equipoEditado == null) return res.status(500).send({ error: "no se encontró el equipo" });
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        return res.status(200).send({ equipo: equipoEditado });
    })


}

function Obtener(req,res){
    var idUsuario;
    if(req.params.liga==null) return res.status(500).send({error: "Ingrese el nombre al que quiere añadir :("})
     if (req.user.rol == "USUARIO") {
        idUsuario = req.user.sub;
    } else if (req.user.rol == "ADMIN") {
        if (req.params.idUsuario == null) {
            return res.status(500).send({ mensaje: "No hay usuario :(" });
        }
        idUsuario = req.params.idUsuario;
    }
    Liga.find({nombre: req.params.liga, idUsuario: idUsuario}, (err, ligaEncontrada)=>{
        if(!ligaEncontrada){
            return res.status(500).send({ error: "No se encuentra la Liga :(" });
        }else{
            Equipo.find({idUsuario: idUsuario, idLiga: ligaEncontrada._id}, (err, equiposEncontrados)=>{
                if(equiposEncontrados.length==0) return res.status(500).send({ mensaje: "La liga no tiene equipos :(" });
                if (err) return res.status(500).send({ mensaje: "Error en la peticion :/" });
                return res.status(200).send({equipos : equiposEncontrados})}).select('nombre')
        }
    })

}

function Tabla(req,res) {
    var idUsuario;
    if(req.params.liga==null) return res.status(500).send({ mensaje: "No ingresó el nombre de la Liga :3"})
    if (req.user.rol == "USUARIO") {
        idUsuario = req.user.sub;
    } else if (req.user.rol == "ADMIN") {
        if (req.params.idUsuario == null) {
            return res.status(500).send({ mensaje: "No envió usuario :(" });
        }
        idUsuario = req.params.idUsuario;
    }
    Liga.findOne({nombre: req.params.liga, idUsuario: idUsuario}, (err, ligaEncontrada)=>{
        if(!ligaEncontrada){
            return res.status(500).send({ mensaje: "No se encontró la Liga :/" });
        }else{
            Equipo.find({idUsuario: idUsuario, idLiga: ligaEncontrada._id}, (err, equiposEncontrados)=>{
                if(equiposEncontrados.length==0) return res.status(500).send({ mensaje: "La liga no tiene equipos :(" });
                if (err) return res.status(500).send({ mensaje: "Error en la peticion ://" });
                return res.status(200).send({tabla : equiposEncontrados})}).sort({ puntos: -1})
        }
    })
}


module.exports = {
    CrearEquipo,
    Eliminar,
    Obtener,
    Tabla
}