var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TablaSchema = Schema ({
    administrador: [{type: Schema.ObjectId, ref: "Usuarios"}],
    golesafavor: Number,
    golesencontra: Number,
    diferenciadegoles: Number,
    puntos: Number

})

module.exports = mongoose.model("Tabla", TablaSchema);