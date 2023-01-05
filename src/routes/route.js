const express = require('express');
const router = express.Router();
const blogController= require("../controllers/blogControllers");
const authorController = require("../controllers/authorController");
const midd = require("../middleware/middleware");


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors", authorController.createrAuthor); 
router.post("/login", authorController.login)
router.post("/blogs",midd.loginCheck,blogController.blogUser);
router.get("/blogs",midd.loginCheck,blogController.getBlogs);
router.put("/blogs/:blogId",midd.loginCheck,midd.authorise,blogController.updateBlog);
router.delete("/blogs/:blogId",midd.loginCheck,midd.authorise,blogController.deleteParam);
router.delete("/blogs",midd.loginCheck, blogController.deleteQuery);

router.all("/*",function(req,res){
    res.status(400).send({status : false, msg:"invalid http request"})
})



module.exports = router;    