const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartidoSchema = Schema({
    Local: {type: Schema.Types.ObjectId, ref: 'Equipos'},
    golesLocal: Number,
    Visitante: {type: Schema.Types.ObjectId, ref: 'Equipos'},
    golesVisita: Number,
    idLiga: {type: Schema.Types.ObjectId, ref: 'Liga'},
    jornada: Number
});

module.exports = mongoose.model('Partidos', PartidoSchema);