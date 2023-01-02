const blogModel = require("../models/blogModel");
const authorModel = require("../models/authoModel");
const { isValidateEmail } = require("../validation/validation");

/*
validate keys value
*/
const blogUser = async function (req, res) {
    try {
        let data = req.body;
        if(!data.title || !data.body ||!data.authorId || !data.category ){
            res.status(400).send({msg: "please Enter The Mandatory Details"})
        }
        let savedData = await blogModel.create(data);
        res.status(201).send({ status: true, data: savedData });
    } catch (error) {
        res.status(500).send({ status: false,msg: error.message});
    }
}
const getBlogs = async function(req,res){

    let qData = req.query
    let findData = await blogModel.find({isDeleted : false , isPublished : true})
    if(!findData){
       return res.status(404).send({msg : "No Such Data Exist"})
    }
    let filterData = await blogModel.find({$or :[{authorId : qData.authorId},{category : qData.category}, {tags : qData.tags}, {subcategory :qData.subcategory }]})
    res.status(200).send({data : filterData})
}


const deleteParam = async function(req,res){
    let data = req.params
    let deletedBlog = await blogModel.findOneAndUpdate({ _id: data.blogId },{ $set: { isDeleted: true} },{ new: true })
    res.send({ status: true, data: deletedBlog})
}

const deleteQuery = async function(req,res){
    let data = req.query
    const save = await blogModel.updateMany({ $and: [{data}, { isDeleted: false }] },{ $set: { isDeleted: true } },
        { new: true })
    res.send({ status: true, data: save })
}


const updateBlog = async function (req, res) {
    try {
        const data = req.body;
        const blogId = req.params.blogId;
        if (!blogId) {
            return res.status(404).json("Enter Blog Id");
        }const deletedData = await blogModel.findById(blogId);
        if (deletedData.isDeleted == true){
            return res.status(404).json("blog already deleted");
        }
        const updatedBlogData = await blogModel.findOneAndUpdate(
            { _id: blogId },
            {
             $set: {
                    title: data.title,
                    body: data.body,
                    isPublished: true,
                    publishedAt: new Date(),
                },
                $push: { tags: data.tags, subcategory: data.subcategory },
            },
            { new: true }
        );

        res.status(201).send({ status: false, data: updatedBlogData });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message});
    }
};





module.exports.blogUser = blogUser;
module.exports.getBlogs = getBlogs; 
module.exports.updateBlog = updateBlog; 
module.exports.deleteParam = deleteParam
module.exports.deleteQuery = deleteQuery
