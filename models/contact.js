function getModel(mongoose){
	var scheme = mongoose.Schema({
		name: String,
		lastname: String,
		phone: String,
		age: Number
	});

	var model = mongoose.model('contact',scheme);

	return model;
}

exports.getModel = getModel;