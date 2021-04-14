let mongoose = require('mongoose');
let Config = require('config');
mongoose.Promise = global.Promise;

mongoose.connect(Config.get("mongo.URI")+Config.get("mongo.database"),{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, },(err,result)=>{
	if(err)
		console.log(err);
	else
		console.log('Mongo Connection success');
})