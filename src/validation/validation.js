const mongoose = require("mongoose")
const isValidateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const passwordVal = function(password){
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,12}$");
    /*at least 1 lowercase, at least 1 uppercase,contain at least 1 numeric character,
    at least one special character, range between 8-12*/
    return strongRegex.test(password)
}

// const xyz = function (ObjectId) {
//     return mongoose.Types.ObjectId.isValid(ObjectId)
    
// }
// const ObjectId = require("mongodb").ObjectId
// const validId = ObjectId.isValid(blogId)



 const isValidName = function (name) {
     const fnameRegex = /^[a-zA-Z]+$/;
     return fnameRegex.test(name);
 };
 
 const matchId = function(idMatch){
    const regCheck = new RegExp(/^[0-9a-fA-F]{24}$/);
    return regCheck.test(idMatch)
 }
//  let checkForValidMongoDbID = new RegExp("^[0-9a-fA-F]{24}$");
//  console.log(checkForValidMongoDbID.test(firstUserID))

module.exports.isValidateEmail= isValidateEmail
module.exports.passwordVal= passwordVal
// module.exports.xyz= xyz
module.exports.matchId=matchId
module.exports.isValidName= isValidName

