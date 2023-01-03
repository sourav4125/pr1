const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const { isValidateEmail } = require("../middleware/validation");

const blogUser = async function (req, res) {
  try {
    let data = req.body;
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
      $and: [{ isDeleted: false, isPublished: true }, { $or: [{ qData }] }],
    });
    if (!findData) {
      return res.status(404).send({ msg: "No Such Data Exist" });
    }
    res.status(200).send({ data: findData });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

/*
figure out how to handle empty params from post man


*/
const deleteParam = async function (req, res) {
 try{
  let data = req.params;
  console.log(data)
  if(!data.blogId){
    return res.status(400).send({msg : "ID in params is missing"})
  }
  let deletedBlog = await blogModel.findOneAndUpdate(
    { _id: data.blogId },
    { $set: { isDeleted: true } },
    { new: true }
  );
  res.status(200).send({ status: true, data: deletedBlog });
}catch(error){
    return res.status(500).send({msg:error.message})
}
}
const deleteQuery = async function (req, res) {
  let data = req.query;
  const save = await blogModel.updateMany(
    { $and: [{ data }, { isDeleted: false }] },
    { $set: { isDeleted: true } },
    { new: true }
  );
  res.send({ status: true, data: save });
};

const updateBlog = async function (req, res) {
  try {
    const data = req.body;
    const blogId = req.params.blogId;
    if (!blogId) {
      return res.status(404).json("Enter Blog Id");
    }
    const deletedData = await blogModel.findById(blogId);
    if (deletedData.isDeleted == true) {
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
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.blogUser = blogUser;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteParam = deleteParam;
module.exports.deleteQuery = deleteQuery;
