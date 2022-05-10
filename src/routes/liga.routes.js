const express = require('express');
const controladorLiga = require('../controllers/liga.controller')
const md_autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/cLiga/:idUsuario?', md_autenticacion.Auth , controladorLiga.CrearLiga)
api.put('/ediLiga/:idUsuario?', md_autenticacion.Auth,controladorLiga.Editar)
api.delete('/eliLiga/:nombre/:idUsuario?', md_autenticacion.Auth, controladorLiga.Eliminar)
api.get('/oLigas/:idUsuario?', md_autenticacion.Auth, controladorLiga.Obtener);
module.exports = api;