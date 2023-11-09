const express = require("express")
const commentRoute = express.Router()
const commentController = require("../controller/comment.controller");
const { auth } = require("../middleware/auth");


commentRoute.post("/create/:id",auth,commentController.writeComment);


module.exports = {
    commentRoute
}