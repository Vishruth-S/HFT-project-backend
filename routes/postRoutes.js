const express = require('express')
const router = express.Router()


const { protectUser } = require('../middlewares/auth')
const { createPost } = require('../controllers/post/createPost')
const {acceptReq}=require('../controllers/post/acceptReq')
const { getPost } = require("../controllers/post/getPost")



// BASE URL - /api/post

router.get('/',protectUser, getPost)
router.post('/', protectUser, createPost)
router.put('/acceptReq/:id', protectUser, acceptReq);


module.exports = router;
