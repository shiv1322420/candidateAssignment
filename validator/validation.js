const JOI = require('joi')

const validateData = (data,schema) => {
      return new Promise((resolve,reject)=>{
        JOI.validate(data, schema,  (err)=> {
          if (err)
            reject(err)
          else
            resolve(true);            
        });
      })
}

module.exports = {
  validateData
}