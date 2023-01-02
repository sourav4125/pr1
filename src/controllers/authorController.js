const authModel = require("../models/authoModel");
const validation = require("../validation/validation");



/* points to validates .
   1. values of each keys validation
   2. email already exist
   3. 
   */
const createrAuthor = async function(req,res){
    try{
    let data = req.body
    if(!data.fname ||!data.lname || !data.title || !data.email || !data.password){
       return res.status(400).send({msg: "please Enter The Mandatory Details"})
    }if(!validation.isValidateEmail(data.email)){
        return res.status(400).send({msg: "Enter valid Email-Id"})
    }if(!validation.passwordVal(data.password)){
        return res.status(400).send({msg: "password should contain atleast one number OR one special character"})
    }
    let createdData = await authModel.create(data)
    res.status(201).send({result : createdData})
}catch(error){
res.status(500).send({msg : error.message})
}}

module.exports.createrAuthor = createrAuthor