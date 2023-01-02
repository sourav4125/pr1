const mongoose = require("mongoose");
const email = require("mongoose-type-email");
// const password = require("password");
const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        require: true
    }, email: {
        type: email,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true

    }
}, { timestamps: true })

module.exports = mongoose.model('authData', authorSchema) 