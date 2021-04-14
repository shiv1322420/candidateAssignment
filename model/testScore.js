
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let testScore = new Schema({
	email: {type: String, required:true},
    testName:{type: String, required:true},
    testScore:{type: Number, required:true},
});

module.exports = mongoose.model('testScores', testScore);