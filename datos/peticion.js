var mongoose = require('mongoose');
var usuario = require('./models/usuario');

mongoose.connect('mongodb://localhost/libreta');

//Verificando conexion
var db = mongoose.connection;
db.on('error',function(){
});
db.once('open', function() {
});

var modelUsu = usuario.getModel(mongoose);

function cargarDatos(app){
    app.get('/API/usuario', function (req, res, next) {
	    res.type('json');
	    var solicitud = req.query.solicitud;
	    var accion = req.query.accion;
        var resjson = {
            transaccion:false,
            respuesta:{},
            error:""
        };

	    if(solicitud == "select"){
	    	if(accion == "todo"){
                modelUsu.find(function (err, usuarios) {
                    if(!err){
                        resjson.transaccion = true;
                        resjson.error = "OK";
                        resjson.respuesta = ordenar_asc(usuarios,"nombre");
                        res.json(resjson);
                    }else{
                        resjson.transaccion = false;
                        resjson.error = "Error";
                        resjson.respuesta = {};
                        res.json(resjson);
                    }
                    
                });
	    	}
	    }
    });

    app.post('/API/usuario', function (req, res, next) {
	    res.type('json');
	    var solicitud = req.query.solicitud;
	    var accion = req.query.accion;
        var resjson = {
            transaccion:false,
            error:""
        };

	    if(solicitud == "insert"){
	    	if(accion == "usuario"){
	    		var nom = req.body.nom;
	    		var ape = req.body.ape;
                var tel = req.body.tel;
	    		var ed = req.body.ed;
                var obj = new modelUsu({
                    nombre: nom,
                    apellido: ape,
                    telefono: tel,
                    edad: ed
                });

                //Guardando el objeto.
                obj.save(function (err) {
                    if(!err){
                        resjson.transaccion = true;
                        resjson.error = "OK";
                        console.log("Save: "+nom+" "+ape);
                        res.json(resjson);
                    }else{
                        resjson.transaccion = false;
                        resjson.error = "Error";
                        res.json(resjson);
                    }
                });
	    	}
	    }else if(solicitud == "delete"){
            if(accion == "usuario"){
                var id = req.body.id;

                modelUsu.findByIdAndRemove(id,function (err) {
                    if(!err){
                        resjson.transaccion = true;
                        resjson.error = "OK";
                        console.log("Delete: "+id);
                        res.json(resjson);
                    }else{
                        resjson.transaccion = false;
                        resjson.error = "Error";
                        res.json(resjson);
                    }
                });
            }
        }
    });
}

exports.cargarDatos = cargarDatos;

//
//
//
//
//

/*Funciones adicionales*/
function ordenar_asc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function ordenar_desc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}