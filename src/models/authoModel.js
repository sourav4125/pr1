const mongoose = require("mongoose");
// const email = require("mongoose-type-email");
// const password = require("password");
const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    }, email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    }
}, { timestamps: true })

module.exports = mongoose.model('authData', authorSchema) 