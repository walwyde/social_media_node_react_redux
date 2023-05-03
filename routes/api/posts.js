const express = require("express")
const mdlwre = require('../../middleware/index')
const { check } = require('express-validator')
const router = express.Router()
const controller = require("../../controllers/posts")


router.get("/", controller.getPosts)

router.post('/',
[mdlwre.auth, 
  check("text", "post text content cannot be empty").not().isEmpty()
], 
controller.newPost)

router.delete('/:post_id', mdlwre.auth, controller.deletePost)

router.put('/likes/:post_id', mdlwre.auth, controller.addLike)

router.put('/unlike/:post_id', mdlwre.auth, controller.unLike)

router.post('/comments/:post_id',
[mdlwre.auth, 
  check("text", "post text content cannot be empty").not().isEmpty()
], 
controller.newComment)

router.delete('/:id/comments/:comment_id', mdlwre.auth, controller.deleteComment)

module.exports = router 