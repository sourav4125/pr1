const express = require('express');
const router = express.Router();
const blogController= require("../controllers/blogControllers")
const authorController = require("../controllers/authorController");


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors", authorController.createrAuthor);
router.post("/blogs",blogController.blogUser)







module.exports = router;    