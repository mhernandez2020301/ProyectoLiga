var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EquipoSchema = Schema ({
    nombre: String,
})

module.exports = mongoose.model("Equipo", EquipoSchema);