const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema( {
    title: {
        type:String,
        require: true,
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true,        
        ref: "authData",
    },
    tags: [String],
    category: {
        type: String,
        required: true
    },
    subcategory:[String],
    isDeleted :{
        type:Boolean,
        default: false,
        date : Date.now()
    },
    publishedAt:{String},
    isPublished  :{
    type:Boolean,
    default: false,
    date : Date.now()
    },
}},{ timestamps: true });


module.exports = mongoose.model('blogData', blogSchema)
