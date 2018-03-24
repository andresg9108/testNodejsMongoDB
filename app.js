var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var peticion = require('./datos/peticion');
var app = express();

//Implementando cors
app.use(cors());

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/public'));

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

peticion.cargarDatos(app);

app.listen(3000,function(){
    console.log('Puerto: 3000');
});