'use strict';
let Models = require('../model/index');

//Get Candidate from DB
let getCandidate = (criteria, projection, options) =>{
    return new Promise((resolve, reject) => {
        Models.candidate.find(criteria, projection, options, (err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        });
    })
};

//Insert Candidate in DB
let createCandidate = (objToSave)=> {
    return new Promise((resolve, reject) => {
        new Models.candidate(objToSave).save((err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        });
    })
};



//Insert Score in DB
let createScore = (objToSave)=> {
    console.log("in a service",objToSave);
    return new Promise((resolve, reject) => {
        new Models.testScore(objToSave).save((err, result) => {
            if (err)
                reject(err)
            else
                resolve(result)
        });
    })
};

//Check highest score average wise

let checkScore = (criteria)=> {
    console.log("in a service",criteria)
    return new Promise((resolve, reject) => {
       Models.testScore.aggregate(criteria,(err,result)=>{
        if (err)
       { 
           
       reject(err)
    }
    else
       {
           
        resolve(result)
     } })
    })
};






module.exports = {
    createCandidate: createCandidate,
    getCandidate: getCandidate,
    createScore: createScore,
    checkScore:checkScore
};