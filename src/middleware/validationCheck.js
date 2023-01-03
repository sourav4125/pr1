// const auth= require("../controllers/authorController")
const blog = require("../models/blogModel");
const auth = require("../models/authorModel");

const idValdation = async function (req, res, next) {
  let data = req.body;
  if (!data.title) {
    return res.status(400).send({ msg: "title is missing" });
  }
  if (!data.body) {
    return res.status(400).send({ msg: "body is missing" });
  }
  if (!data.authorId) {
    return res.status(400).send({ msg: "body is missing" });
  }
  if (!data.category) {
    return res.status(400).send({ msg: "category is missing" });
  }
  let authorIdIsValid = await auth.findOne({ _id: data.authorId });
  if (!authorIdIsValid) {
    return res.status(400).send({ msg: "Enter a valid author id" });
  }
  next();
};
module.exports.idValdation = idValdation;
