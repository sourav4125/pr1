const authModel = require("../models/authoModel");

const createrAuthor = async function(req,res){
    try{
    let data = req.body
    let createdData = await authModel.create(data)
    res.status(201).send({result : createdData})
}catch(error){
res.status(400).send({msg : error.message})
}}

module.exports.createrAuthor = createrAuthor