var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema ({
    nombre: String,
    apellido: String,
    username: String,
    password: String,
    rol: String,
    email: String,
})

module.exports = mongoose.model("Usuario", UsuarioSchema);