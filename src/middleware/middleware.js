const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const loginCheck = async function (req, res, next) {
  try {
    const hData = req.headers["x-api-key"];
    if (!hData) {
      return res
        .status(400)
        .send({ status: false, msg: `headers is missing in request` });
    }

    const decodedToken = jwt.verify(hData, "thisIsASecretKeyOfAPNAgroup", (err, decodedToken) => {
      if (err) {
        return res.status(400).send({ status: false, msg: err.message })
      } else {
        req.decodedToken = decodedToken
        next();
      }})
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};

const authorise = async function (req, res, next) {
try{
   const token = req.decodedToken
  let blogId = req.params.blogId;
  let authorId = token.authorid;

  let extId = await blogModel.findOne({_id: blogId})
  if(!extId){
    return res.status(404).send({msg: "blogId does not exist"})
  }
  let extAuthId= extId.authorId
 
  if(authorId!=extAuthId){
    return res.send({ status: false, msg: "You are not allowed to modify other's data" })
  }
  next();
}catch(error){
    res.status(500).send({status:false, Error :error.message})
}
};

module.exports.loginCheck = loginCheck;
module.exports.authorise = authorise;
