const express = require('express');
const router = express.Router();
const blogController= require("../controllers/blogControllers")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/blogs",blogController.blogUser)







module.exports = router;    