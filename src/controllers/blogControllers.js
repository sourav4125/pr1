const blogModel = require("../models/blogModel")
const authorModel = require("../models/authoModel")

const blogUser = async function (req, res) {
    try{
    let data = req.body;
    let savedData = await blogModel.create(data);  
    res.status(201 ).send({status:true, data: savedData });
  }
  catch (err)
  {
  res.status(400).send({status:false, msg:"Please Check Your Input", error : err})  
  }  
  const {author}= req.body.authorId
  const authorDetails = await authorModel.findOne({_Id: author})  
  if (!authorDetails){
    return res.send({status:false, message:"Please Enter Valid AuthorId"})
  }
}

    












module.exports.blogUser=blogUser