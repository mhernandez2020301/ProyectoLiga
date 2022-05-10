const Liga = require('../models/liga.model');

//CREATE
function CrearLiga(req,res){
    var parametros = req.body;
    var idUser= req.params.idUsuario;
    var modelLiga = new Liga();

    if (req.user.rol =='USUARIO'){

        Liga.findOne({idUsuario : req.user.sub, nombre: parametros.nombre},(err,LigaEncontrada)=>{
            if(err) return res.status(500).send({message:'error en la peticion'});
            if(LigaEncontrada){ return res.status(500).send({mensaje:'error la liga ya existe'});}
            modelLiga.nombre = parametros.nombre;
            modelLiga.idUsuario = req.user.sub;
            modelLiga.save((err,ligaGuardada)=>{
                if(err) return res.status(500).send({mensaje:'error ne la peticion 2'});
                if(ligaGuardada){
                        return res.status(200).send({liga:ligaGuardada})
                }else{
                    return res.status(500).send({mensaje:'error al crear La liga'})
                }
            })
        })
    }else if (req.user.rol=='ADMIN'){
        if(idUser==null){
            return res.status(500).send({mensaje:'usted como administrador debe de enviar id de un usuario'})
        }
        Liga.findOne({idUsuario : idUser, nombre: parametros.nombre},(err,LigaEncontrada)=>{
            if(err) return res.status(500).send({message:'error en la peticion'});
            if(LigaEncontrada.nombre >= 0){
                return res.status(500).send({mensaje:'error la liga ya existe'});
            }
            modelLiga.nombre = parametros.nombre;
            modelLiga.idUsuario = idUser;
            modelLiga.save((err,ligaGuardada)=>{

                if(err) return res.status(500).send({mensaje:'error ne la peticion 2'});
                if(ligaGuardada){
                        return res.status(200).send({liga:ligaGuardada})
                }else{
                    return res.status(500).send({mensaje:'error al crear La liga'})
                }
            })


        })
    }   


    
}

//EDIT
function Editar(req,res){
    var parametros = req.body;
    var idUser= req.params.idUsuario;
    if (req.user.rol =='USUARIO'){
       Liga.findOne({ nombre: parametros.nombre},(err,LigaEncontrada)=>{
        if(err) return res.status(500).send({mensaje:'Error en la Petición :/'});
        if(LigaEncontrada){
            return res.status(500).send({mensaje:'Ya existe esta liga'});
        }else{
            Liga.findOne({idUsuario: req.user.sub},(err,ligaEncontrada1)=>{

                if(err) return res.status(500).send({mensaje:'Error en la Petición ://'});
                if(ligaEncontrada1){

                    Liga.findOneAndUpdate({idUsuario :ligaEncontrada1.idUsuario},parametros,{ new: true },(err,ligaActualizada)=>{
                        if(err) return res.status(500).send({mensaje:'Error en la Petición :///'});
                        if(ligaActualizada){
                                return res.status(200).send({liga:ligaActualizada})
                        }else{
                            return res.status(500).send({mensaje:'Error al editar :C'})
                        }
                   })
                }else{
                    return res.status(500).send({mensaje:'Error al Encontrar :('})
                }
            })
        }
       }
    )
    }else if (req.user.rol=='ADMIN'){
        if(idUser==null){
            return res.status(500).send({ mensaje: 'Ingrese el ID del Usuario :)' })}
        Liga.findOne({ nombre: parametros.nombre},(err,LigaEncontrada)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la petición :/' });
            if(LigaEncontrada){
                return res.status(500).send({ mensaje: 'Esta liga ya existe :/' });
            }else{
                Liga.findByIdAndUpdate(idUser,parametros,{ new: true },
                    (err,LigaEditada)=>{
                        if(err) return res.status(500).send({message:'Error en la petición :/'});
                        if(LigaEditada){ return res.status(200).send({liga:LigaEditada})
                        }else{
                            return res.status(500).send({ mensaje:'Error al Editar :c' })
                        }
                    }
                )
            }
        })
    }   
} 

//GET
function Obtener(req,res){
    if (req.user.rol == "USUARIO") {
        idUsuario = req.user.sub;
    } else if (req.user.rol == "ADMIN") {
        if (req.params.idUsuario == null) {
            return res.status(500).send({mensaje: "Envíe el Usuario"});
        }

        idUsuario = req.params.idUsuario;
    }
    Liga.find({ idUsuario: idUsuario }, (err, ligasFounded) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion :/" });
        if (ligasFounded == null)
            return res.status(500).send({ mensaje: "No se encontraron ligas" });
        if (ligasFounded.length == 0)
            return res.status(500).send({ mensaje: 'No hay ligas :(' });
        return res.status(200).send({ Ligas: ligasFounded });
    });
}

//DELETEAR
function Eliminar(req,res) {
    if(req.params.nombre==null) 
    return res.status(500).send({mensaje: "Escriba el nombre de la LIGA a ELIMINAR :D"})

      var idUsuario;

    if (req.user.rol == "USUARIO") {
        idUsuario = req.user.sub;
    } else if (req.user.rol == "ADMIN") {
        if (req.params.idUsuario == null) {
            return res.status(500).send({mensaje: "No hay usuario :("});
        }
    }Liga.findOneAndDelete({ nombre: req.params.nombre,}, (err, ligaDeleteada) => {
            if (ligaDeleteada == null)
                return res.status(500).send({ error: "Liga no Encontrada :C" });
            if (err) return res.status(500).send({ mensaje: "Error en la peticion :/" });
            return res.status(200).send({ Liga: ligaDeleteada });
        }
    )
}



module.exports ={
    CrearLiga,
    Obtener,
    Eliminar,
    Editar
}