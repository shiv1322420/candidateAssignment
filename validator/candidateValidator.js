const JOI = require('joi');
const VALIDATION_CHECK = require('./validation');
const HTTPRESPONSE = require('../util/http-response')

const validateRegister = async (req, res, next)=>{
    const schema = JOI.object({
        name: JOI.string().trim().required().messages({'string.empty':`name can not be empty.`}),
        email:JOI.string().trim().allow('').email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({'string.pattern.base':`Please enter valid email address.`}).optional(),
        
    })
    try {
        let loginResult = await schema.validateAsync(req.body);
        if (loginResult)
            next();
    } catch (error) {
        HTTPRESPONSE.fail(res, error.details[0].message, { })
    }
}



const validateTestScore = async (req, res, next)=>{
    const schema = JOI.object({
        email:JOI.string().trim().allow('').email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({'string.pattern.base':`Please enter valid email address.`}).optional(),
        testName: JOI.string().trim().required().messages({'string.empty':`testname can not be empty.`}),
        testScore: JOI.number().min(0).max(10).required(),
    })
    try {
        let loginResult = await schema.validateAsync(req.body);
        if (loginResult)
            next();
    } catch (error) {
        HTTPRESPONSE.fail(res, error.details[0].message, { })
    }
}

module.exports = {
    validateRegister,
    validateTestScore
}