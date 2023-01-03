const authModel = require("../models/authorModel");
const validation = require("../middleware/validation");

/* points to validates .
   1. password is valid.
   2. email already exist
   3. 
   */
const createrAuthor = async function (req, res) {
  try {
    let data = req.body;
    if (!data.fname) {
      return res.status(422).send({ msg: "fname  is missing" });
    }
    if (!data.lname) {
      return res.status(422).send({ msg: "lname is missing" });
    }
    if (!data.title) {
      return res.status(422).send({ msg: "title is missing" });
    }
    if (!data.email) {
      return res.status(422).send({ msg: "email is missing" });
    }
    if (!data.password) {
      return res.status(422).send({ msg: "password is missing" });
    }
    if (!validation.isValidateEmail(data.email)) {
      return res.status(422).send({ msg: "Enter valid Email-Id" });
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
    // if (!validation.passwordVal(data.password)) {
    //   return res
    //     .status(400)
    //     .send({
    //       msg: "password at least 1 lowercase, at least 1 uppercase,contain at least 1 numeric character, at least one special character, range between 8-12",
    //     });
    // }
    let createdData = await authModel.create(data);
    res.status(201).send({ result: createdData });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports.createrAuthor = createrAuthor;
