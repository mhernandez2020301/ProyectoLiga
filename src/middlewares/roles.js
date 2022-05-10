exports.verAcmin = function(req, res, next){
    if (req.user.rol !== 'ADMIN') return res.status(403).send( {mensaje:'No es un admin >:c'} )
    next();
} 

exports.verDueñoliga = function(req, res, next){
    if( req.user.rol !=='USUARIO' ) return res.status(403).send( {mensaje:'Es un admin >:c'} )

    next();

}