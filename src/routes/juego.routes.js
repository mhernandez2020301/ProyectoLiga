const express = require('express');

const controladorJuego = require('../controllers/juego.controller')
const md_autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/cPartido/:liga/:idUsuario?', md_autenticacion.Auth, controladorJuego.crearPartido);

module.exports = api;