var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LigaSchema = Schema ({
    participantes: [{
        equipos: [{type: Schema.ObjectId, ref: "Team"}]
    }],
    jornadas: Number
})

module.exports = mongoose.model("Ligas", LigaSchema);