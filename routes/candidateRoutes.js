const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const VALIDATION = require('../validator/candidateValidator');
const CANDIDATE_CONTROLLER = require('../controllers/candidateController');

ROUTER.get('/', function (req, res) {
    res.send('Candidate Home Page');
})

//------------------------Onboarding APIS----------------------------------

ROUTER.post('/register', VALIDATION.validateRegister, CANDIDATE_CONTROLLER.register)

ROUTER.post('/addScore', VALIDATION.validateTestScore, CANDIDATE_CONTROLLER.registerScore)

ROUTER.get('/getScore', CANDIDATE_CONTROLLER.getScore)

module.exports = ROUTER;