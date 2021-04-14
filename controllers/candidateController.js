const candidateServices = require('../services/candidateService');
const HTTP_RESPONSE = require('../util/http-response');



let register = async (req, res) => {
    let api = "CANDIDATE_REGISTER"
    let  email = '', name = ''
    let criteria = {}, projection = {}, options = {}, dataToSave = {}

    email = req.body.email
    name = req.body.name
    dataToSave = {
        email,
        name
    }

    try {

        criteria = {
            email: email
        }
        projection = {
            
        }
        options = {
            lean: true
        }
        let candidateData = await candidateServices.getCandidate(criteria, projection, options)
        if (candidateData.length > 0) {
        
            HTTP_RESPONSE.fail(res,"Candidate has already registered", {}, api);
                
        }
        else{
            //register user in DB
            let registerdUserData = await candidateServices.createCandidate(dataToSave)
            HTTP_RESPONSE.success(res, "Candidate registered successfully", { data: registerdUserData }, api)
        }
            

    } catch (error) {
        HTTP_RESPONSE.fail(res, error, {}, api)
    }
}



let getScore = async (req, res) => {
    let api = "GET_SCORE";
    let  projection = {}, options = {}, dataToSave = {}
   
    try {

     projection = {
            
        }
        options = {
            lean: true
        }
//define criteria for aggregation
        let  criteria = []
       //group by email
        criteria.push({
                $group:
                  {
                    _id: '$email',
                    avgScore: { $avg: { $max: {$sum:"$testScore"} } }
                  }
              }
        )

        //sort by highest to lowest

        criteria.push({$sort:{avgScore:-1}})
       
       //lookup to get a candiate name
       criteria.push( { $lookup:
        {
          from: "candidates",
          localField: "_id",
          foreignField: "email",
          as: "studentInfo",
        },
        })

        criteria.push({ "$unwind": "$studentInfo" },)
       
       
       let candidateData = await candidateServices.checkScore(criteria)
      
       let result={}
        result.email=candidateData[0].studentInfo.email;
        result.name=candidateData[0].studentInfo.name;
        result.avgScore=candidateData[0].avgScore;
     
        if (candidateData.length > 0) {
             
             HTTP_RESPONSE.success(res, "Success", { data: result }, api)
                
            }
            else{
                HTTP_RESPONSE.fail(res,"Data not found", {}, api);
             
            }
       

    } catch (error) {
        HTTP_RESPONSE.fail(res, error, {}, api)
    }
}


let registerScore = async (req, res) => {
    let api = "TESTSCORE_REGISTER"
    let email='', testName='', testScore=''  ,maxScore=10
   let criteria = {}, projection = {}, options = {}, dataToSave = {}


   email = req.body.email,
   testName=req.body.testName,
   testScore=req.body.testScore
    try {

        criteria = {
            email: email
        }
        let projection = {
            
        }
        options = {
            lean: true
        }
        dataToSave={
            email,
            testName,
            testScore
        }
        let candidateData = await candidateServices.getCandidate(criteria, projection, options)
        if (candidateData.length > 0) {
             
            //check for score not greater than maximum score
            if(testScore>maxScore) {                    
                HTTP_RESPONSE.fail(res,"Candidate's score is not more than maximum score", {}, api);
            }
            else{
              //register user in DB
              console.log("in a service")
              let registerdUserData = await candidateServices.createScore(dataToSave)
              HTTP_RESPONSE.success(res, "Candidate's score registered successfully", { data: registerdUserData }, api)
            }

             
        }
        else{
           
            HTTP_RESPONSE.fail(res,"Candidate should be registered first", {}, api);
        }
            

    } catch (error) {
        HTTP_RESPONSE.fail(res, error, {}, api)
    }
}




module.exports = {
       register,
       registerScore,
       getScore
   
}