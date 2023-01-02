const blogModel = require("../models/blogModel");
const authorModel = require("../models/authoModel");

const blogUser = async function (req, res) {
    try {
        let data = req.body;
        let savedData = await blogModel.create(data);
        res.status(201).send({ status: true, data: savedData });
    } catch (err) {
        res.status(400).send({
            status: false,
            msg: "Please Check Your Input",
            error: err,
        });
    }
    const { author } = req.body.authorId;
    const authorDetails = await authorModel.findOne({ _Id: author });
    if (!authorDetails) {
        return res.send({
            status: false,
            message: "Please Enter Valid AuthorId",
        });
    }
};
//  ### PUT /blogs/:blogId

// - Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
exports.blogUpdate = async (req, res) => {
    try {
        const { title, body, tags, subcategory } = req.body;
        let blogId = req.params.blogId;
        const updated = await blogModel.findByIdAndUpdate(
            blogId,
            {
                $set: {
                    title: title,
                    body: body,
                    $push: { tags: tags, subcategory: subcategory },
                },
            },
            { new: true }
        );
        res.status(200).json({
            status: true,
            msg: "updated successfully",
            updated,
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// - Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
exports.updatePublished = async (req, res) => {
    try {
        let blogId = req.params.blogId;
        const updated = await blogModel.findByIdAndUpdate(
            blogId,
            {
                $set: { ispublished: true, publishedAt: Date.now() },
            },
            { new: true }
        );
        if (updated.ispublished == true) {
            res.status(200).send({
                status: true,
                msg: "updated successfully",
                updated,
            });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// - Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)// - Return an HTTP status 200 if updated successfully with a body like [this](#successful-response-structure)
// - Also make sure in the response you return the updated blog document.
exports.existId = async (req, res) => {
    try {
        let data = req.body;
        let blogId = req.params.blogId;
        if (blogId) {
            const updated = await blogModel.findByIdAndUpdate(blogId, data, {
                new: true,
            });
            res.status(200).json({
                status: true,
                msg: "updated successfully",
                updated,
            });
        }
        if (!blogId) {
            res.status(404).json({
                status: false,
                msg: "blogId doesn't exists",
            });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

module.exports.blogUser = blogUser;

module.exports.blogUser = blogUser;
