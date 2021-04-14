
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let candidate = new Schema({
	name: {type: String, required:true},
	email: {type: String, required:true},
});


module.exports = mongoose.model('candidates', candidate);