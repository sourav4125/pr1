const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const{ matchId } = require("../validation/validation");
// const {isValidObjectId} = require("mongoose");
const mongoose = require("mongoose")



const blogUser = async function (req, res) {
  try {
    let data = req.body;
    if (!data.title) {
      return res.status(400).send({ status: false,msg: "title is missing" });
    }
    if (!data.body) {
      return res.status(400).send({status: false, msg: "body is missing" });
    }
    if (!data.authorId) {
      return res.status(400).send({ status: false, msg: "autherId is missing" });
    }
    if (!data.category) {
      return res.status(400).send({ status: false, msg: "category is missing" });
    }
    let authorIdIsValid = await authorModel.findOne({ _id: data.authorId });
    if (!authorIdIsValid) {
      return res.status(400).send({status: false, msg: "Enter a valid author id" });
    }
    let savedData = await blogModel.create(data);
    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
const getBlogs = async function (req, res) {
  try {
    let qData = req.query;
    let findData = await blogModel.find({
      $and: [{ isDeleted: false, isPublished: true }, { qData }]}); // modification here
    if (!findData) {
      return res.status(404).send({ status: false, msg: "No Such Data Exist" });
    }
    res.status(200).send({ status: true ,data: findData });
  } catch (error) {
    res.status(500).send({status: false, msg: error.message });
  }
};


const updateBlog = async function (req, res) {
  try {
    const data = req.body;
    const blogId = req.params.blogId;

    // if (blogId.length != 24) {
    //   return res.status(404).send({ status: false, msg: "Enter Blog Id" });
    // }
    // const ObjectId = require("mongodb").ObjectId
    // const validId = ObjectId.isValid(blogId)
    console.log("i am reaching 3")
    if(!matchId(blogId) ){
      return res.status(404).send({ status: false, msg: "Blog Id is incorrect" });
    }

    const deletedData = await blogModel.findById(blogId);
    if (deletedData.isDeleted == true) {
      return res.status(200).send({ status: false, msg: "blog already deleted" });
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

    res.status(200).send({ status: true, data: updatedBlogData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

/*
figure out how to handle empty params from post man


*/

const deleteParam = async function (req, res) {
  try {
    let data = req.params;
  //  
    // if (!data.blogId) {
    //   return res.status(400).send({ msg: "ID in params is missing" });
    // }
    // 
    const deletedData = await blogModel.findById(data.blogId);
    if (deletedData.isDeleted == true) {
      return res.status(200).send({ status: false, msg: "blog already deleted" });
    }
    let deletedBlog = await blogModel.findOneAndUpdate(
      { _id: data.blogId },
      { $set: { isDeleted: true },deletedAt : new Date() },
      { new: true }
    );
    res.status(200).send({ status: true, data: deletedBlog });
  } catch (error) {
    return res.status(500).send({status: false, msg: error.message });
  }
};

// check why this is not working, when we apply middlewares 


const deleteQuery = async function (req, res) {
  try {
  let data = req.query;
    /* we have to pass from path params for un-commenting this
  const deletedData = await blogModel.findById(data.blogId);
  if (deletedData.isDeleted == true) {
    return res.status(200).send({ status: false, msg: "blog already deleted" });
  }
*/
  const save = await blogModel.updateMany(
    { $and: [{ data }, { isDeleted: false }] },
    { $set: { isDeleted: true } , deletedAt : new Date()},
    { new: true }
  );
  res.status(200).send({ status: true, data: save });
  }catch(error){
    res.status(500).send({status:false, msg : error.message})
  }
};



module.exports.blogUser = blogUser;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteParam = deleteParam;
module.exports.deleteQuery = deleteQuery;
