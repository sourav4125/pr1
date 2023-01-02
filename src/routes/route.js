const authorController = require("../controllers/authorController");
const express = require("express");
const router = express.Router();



router.post("/authors", authorController.createrAuthor);

module.exports = router