class HttpResponse {

/*
* @function <b> success </b> <br> 
* send success message 
* @param {String} response, message , data
* @return {json} send success message
*/
    static success (res, message, data, api) {
        this.success_log(200,message,data, api)
        return res.status(200).json({
            status:200,
            message,
            data
        })
    }

/*
* @function <b> fail </b> <br> 
* send fail message 
* @param {String} response, message , data
* @return {json} send fail message
*/
    static fail (res, message, data, api) {
        this.fail_log(400, message, data, api)
        return res.status(400).json({
            status:400,
            message,
            data
        })
    }

/*
* @function <b> fail </b> <br> 
* send fail message 
* @param {String} response, message , data
* @return {json} send fail message
*/
static failSessionExpire (res, message, data, api) {
    this.fail_log(401, message, data, api)
    return res.status(401).json({
        status:401,
        message,
        data
    })
}

/*
* @function <b> fail_log </b> <br> 
* log fail message 
* @param {String} response, message , data
* @return {json} log fail message
*/
    static fail_log (status,message, data, api) {
        console.log('\x1b[31m%s\x1b[0m',JSON.stringify({
            API: api || "",
            STATUS: status,
            MESSAGE:message,
            DATA: data
        }))
    }

/*
* @function <b> success_log </b> <br> 
* log success message 
* @param {String} response, message , data
* @return {json} send log message
*/
    static success_log (status, message, data, api) {
        console.log('\x1b[32m%s\x1b[0m',JSON.stringify({
            API: api || "",
            STATUS: status,
            MESSAGE:message,
            DATA: data
        }));
    }

}

module.exports = HttpResponse;