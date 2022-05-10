const express = require('express');

const controladorUsuario=require('../controllers/usuario.controller')
//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/roles');

const api = express.Router();
api.post('/login',controladorUsuario.Login)
api.post('/cUsuario',controladorUsuario.Registrar),
api.post('/cAdmin',[md_autenticacion.Auth,md_rol.verAcmin],controladorUsuario.RegistrarAdmin)
api.put('/ediUsuario/:idUsuario?',[md_autenticacion.Auth],controladorUsuario.Editar);
api.delete('/eliUsuario/:idUsuario?',[md_autenticacion.Auth],controladorUsuario.Eliminar)
module.exports = api;