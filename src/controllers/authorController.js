const authModel = require("../models/authorModel");
const validation = require("../middleware/validation");

const createrAuthor = async function (req, res) {
  try {
    let data = req.body;
    if (!data.fname) {
      return res.status(422).send({ status: false, msg: "fname  is missing" });
    }
    if (!data.lname) {
      return res.status(422).send({status: false, msg: "lname is missing" });
    }
    if (!data.title) {
      return res.status(422).send({ status: false, msg: "title is missing" });
    }
    if (!data.email) {
      return res.status(422).send({ status: false, msg: "email is missing" });
    }
    if (!data.password) {
      return res.status(422).send({status: false, msg: "password is missing" });
    }
    if (!validation.isValidateEmail(data.email)) {
      return res.status(422).send({status: false, msg: "Enter valid Email-Id" });
    }
    const { email } = req.body;
    const isEmailAlredyUsed = await authModel.findOne({ email });
    if (isEmailAlredyUsed) {
      return res
        .status(422)
        .send({
          status: false,
          message: `${email} email address is already registered`,
        });
    }
    if (!validation.passwordVal(data.password)) {
      return res.status(400).send({status: false, msg: "password at least 1 lowercase, at least 1 uppercase,contain at least 1 numeric character, at least one special character, range between 8-12"});
    }
    let createdData = await authModel.create(data);
    res.status(201).send({status: true, result: createdData });
  } catch (error) {
    res.status(500).send({status: false, msg: error.message });
  }
};

module.exports.createrAuthor = createrAuthor;
