var oMongoose = require('mongoose');
var oContact = require('./models/contact');

oMongoose.connect('mongodb://localhost/notebook');

var db = oMongoose.connection;
db.on('error',function(){
});
db.once('open', function() {
});

var oMContact = oContact.getModel(oMongoose);

function load(app){
    app.get('/API/contact', function (req, res, next) {
	    res.type('json');
	    var request = req.query.request;
	    var action = req.query.action;
        var resjson = {
            transaction:false,
            respuesta:{},
            error:""
        };

	    if(request == "select"){
	    	if(action == "all"){
                oMContact.find(function (err, contacts) {
                    if(!err){
                        resjson.transaction = true;
                        resjson.error = "OK";
                        resjson.respuesta = orderAsc(contacts, "name");
                        res.json(resjson);
                    }else{
                        resjson.transaction = false;
                        resjson.error = "Error";
                        resjson.respuesta = {};
                        res.json(resjson);
                    }
                    
                });
	    	}
	    }
    });

    app.post('/API/contact', function (req, res, next) {
	    res.type('json');
	    var request = req.query.request;
	    var action = req.query.action;
        var resjson = {
            transaction:false,
            error:""
        };

	    if(request == "insert"){
    		var nom = req.body.name;
    		var ape = req.body.lastname;
            var tel = req.body.phone;
    		var ed = req.body.age;
            var obj = new oMContact({
                name: nom,
                lastname: ape,
                phone: tel,
                age: ed
            });

            obj.save(function (err) {
                if(!err){
                    resjson.transaction = true;
                    resjson.error = "OK";
                    console.log("Save: "+nom+" "+ape);
                    res.json(resjson);
                }else{
                    resjson.transaction = false;
                    resjson.error = "Error";
                    res.json(resjson);
                }
            });
	    }else if(request == "delete"){
            var id = req.body.id;

            oMContact.findByIdAndRemove(id,function (err) {
                if(!err){
                    resjson.transaction = true;
                    resjson.error = "OK";
                    console.log("Delete: "+id);
                    res.json(resjson);
                }else{
                    resjson.transaction = false;
                    resjson.error = "Error";
                    res.json(resjson);
                }
            });
        }
    });
}

exports.load = load;

//
//
//
//
//

function orderAsc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function orderDesc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}