const blogModel = require("../models/blogModel")
const authorModel = require("../models/authoModel")

const blogUser = async function (req, res) {
    const data=  req.body
    const findAuthor = await authorModel.findById(data.authorId);
  if (!findAuthor) {
    return res.status(400).send({ status: false, message: `Author does not exists.` });
  }

    
    let savedData = await blogModel.create(data);  
    res.status(201).send({status:true, data: savedData });  
  
  
}












module.exports.blogUser=blogUser