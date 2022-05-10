const express = require('express');
const controladorEquipo = require('../controllers/equipo.controller')
//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/roles');

const api = express.Router();
api.post('/cEquipo/:idUsuario?',md_autenticacion.Auth, controladorEquipo.CrearEquipo);
api.delete('/eliEquipo/:nombre/:idUsuario?', md_autenticacion.Auth, controladorEquipo.Eliminar);
api.get('/oEquiposLiga/:liga/:idUsuario?', md_autenticacion.Auth, controladorEquipo.Obtener);
api.get('/oTabla/:liga/:idUsuario?', md_autenticacion.Auth, controladorEquipo.Tabla);

module.exports = api;