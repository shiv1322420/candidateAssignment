const EXPRESS = require('express');
const CANDIDATE_ROUTE = require('./routes/candidateRoutes');
const BODY_PARSER = require('body-parser');
const APP = EXPRESS();
const PORT = 8001
const BOOTSTRAP = require('./util/bootstrap')
const config = require('config')


//handel application/json
APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: true }));

// for parsing multipart/form-data
APP.use(EXPRESS.static('public'));



//middlewares for user, admin and books
 APP.use('/candidate', CANDIDATE_ROUTE);


//Run server 
APP.listen(config.get("PORT") || PORT, (err,res) => {
  if (err) {
    console.log(err)
  }
  console.log('App Running on port '+config.get("PORT") || PORT);
});