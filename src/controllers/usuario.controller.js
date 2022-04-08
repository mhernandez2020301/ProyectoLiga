const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt.js');


function Registrar(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();
    if (parametros.nombre && parametros.apellido &&
        parametros.email && parametros.password) {
        usuarioModel.nombre = parametros.nombre;
        usuarioModel.apellido = parametros.apellido;
        usuarioMode.username = parametros.username;
        usuarioModel.rol = 'USUARIO';
        usuarioModel.imagen = null;

        Usuario.find({ username: parametros.username }, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length <= 0) {

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;

                    usuarioModel.save((err, usuarioGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' });
                        if (!usuarioGuardado) return res.status(500)
                            .send({ mensaje: 'Error al agregar el Usuario' });

                        return res.status(200).send({ usuario: usuarioGuardado });
                    });
                });
            } else {
                return res.status(500)
                    .send({ mensaje: 'Este usuario, ya  se encuentra utilizado' });
            }
        })
    }
}

function RegistrarAdminDefault(){
    var usuarioModel =  new Usuario();
    usuarioModel.nombre = 'ADMIN';
    usuarioModel.apellido = 'ADMIN';
    usuarioModel.username = 'ADMIN';
    usuarioModel.password = '123456';
    usuarioModel.rol= 'ADMIN';

    Usuario.find({username: 'ADMIN'},(err,usuarioEncontrado)=>{
        if(usuarioEncontrado.length  <= 0){
            bcrypt.hash('123456',null,null,(err,passwordEncriptada)=>{
                usuarioModel.password = passwordEncriptada;
                usuarioModel.save((err, usuarioGuardado)=>{

                    if(err) return console.log('error en la peticion')
                     if(usuarioGuardado){
                        console.log('admin creado');
                     }else{
                         console.log('no se creo el admin ')
                     }
                });
            })

        }else{
            return console.log('el admin ya esta registrado uwu');
        }

    })

}


function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ username: parametros.username }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (usuarioEncontrado) {
            // COMPARO CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password,
                (err, verificacionPassword) => {//TRUE OR FALSE
                    // VERIFICO SI EL PASSWORD COINCIDE EN BASE DE DATOS
                    if (verificacionPassword) {
                        // SI EL PARAMETRO OBTENERTOKEN ES TRUE, CREA EL TOKEN
                        if (parametros.obtenerToken === 'true') {
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }


                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide' });
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el usuario no se encuentra registrado.' })
        }
    })
}

function Editar(req, res){
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    // BORRAR LA PROPIEDAD DE PASSWORD EN EL BODY
    delete parametros.password

    Usuario.findByIdAndUpdate(idUser, parametros, {new: true}, (err, usuarioEditado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuarioEditado) return res.status(500).send({mensaje: 'Error al editar el Usuario'});

        return res.status(200).send({ usuario: usuarioEditado });
    })

}

function Eliminar (req, res){
    var idUser = req.params.idUsuario;
    Usuario.findOne({iduser: idUser},(err, usuarioEncontrado)=>{
      if(err) return res.status(500).send({message:'error en la peticion'});
      Usuario.findByIdAndDelete(idUser,
          (err, usuarioEliminado) => {
              if (err) return res.status(500)
                  .send({ mensaje: 'Error en la peticion' });
              if (!usuarioEliminado) return res.status(500)
                  .send({ mensaje: 'Error al eliminar el Usuario' });
              return res.status(200).send({ usuario: usuarioEliminado })
          })      
    })
}

function Obtener(req, res) {
    Usuario.find({}).exec((err, usuariosEncontrados)=>{
        if(err) return res.status(500).send({message: "Error al encontrar los Usuarios"});
         if(!usuariosEncontrados){
            return res.status(500).send({message: "No se encontraron Usuarios"});
           
        }else{
            return res.send({message: "Usuarios: ", usuariosEncontrados});
           
        }
    })
}
module.exports = {
    Registrar,
    RegistrarAdminDefault,
    Editar,
    Login,
    Eliminar,
    Obtener
}