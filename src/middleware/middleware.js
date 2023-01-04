const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const loginCheck = async function (req, res, next) {
  try {
    const token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(403)
        .send({ status: false, msg: `headers is missing in request` });
    }
    const decodedToken = jwt.verify(token, "thisIsASecretKeyOfAPNAgroup");
    if (!decodedToken) {
      return res
        .status(403)
        .send({
          status: false,
          msg: `Invalid authentication token in request`,
        });
    }
    next();
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};
const authorise = async function (req, res, next) {
try{
    const token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(403)
        .send({ status: false, msg: `headers is missing in request` });
    }
    const decodedToken = jwt.verify(token, "thisIsASecretKeyOfAPNAgroup");
    // console.log(decodedToken)
    if (!decodedToken) {
      return res
        .status(403)
        .send({
          status: false,
          msg: `Invalid authentication token in request`,
        });
    }
  let blogId = req.params.blogId;
  let authorId = decodedToken.authorid;

  let extId = await blogModel.findOne({_id: blogId})
  let extAuthId= extId.authorId
  console.log(extAuthId)
  console.log("i m middleware")
  if(authorId!=extAuthId){
    return res.send({ status: false, msg: "you are not allowed to make change in others DATA" })
  }
  
  next();

}catch(error){
    res.status(500).send({status:false, Error :error.message})
}
};

module.exports.loginCheck = loginCheck;
module.exports.authorise = authorise;
