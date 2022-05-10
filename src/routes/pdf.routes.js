const express = require('express');

const pdf = require('../controllers/pdf.controller')
const md_autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/generar', pdf.InvoiceGenerator);

module.exports = api;