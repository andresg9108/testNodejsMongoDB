function getModel(mongoose){
	//Esquema
	var esquema = mongoose.Schema({
		nombre: String,
		apellido: String,
		telefono: String,
		edad: Number
	});

	//Modelo
	var model = mongoose.model('usuario',esquema);

	return model;
}

exports.getModel = getModel;