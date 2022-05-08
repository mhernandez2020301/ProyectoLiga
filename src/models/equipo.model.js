var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EquipoSchema = Schema ({
    nombre: String,
    golesF: Number,
    golesC: Number,
    Diferencia: Number,
    partidosJugados: Number,
    puntos: Number,
    idUsuario: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
    idLiga: {type: Schema.Types.ObjectId, ref: 'Liga'}
})

module.exports = mongoose.model("Equipo", EquipoSchema);
