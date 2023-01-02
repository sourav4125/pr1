const isValidateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const passwordVal = function(password){
    const pass =  /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return pass.test(password)
}




module.exports.isValidateEmail= isValidateEmail
module.exports.passwordVal= passwordVal

