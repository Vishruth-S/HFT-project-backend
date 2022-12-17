const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { protectUser } = require('../middlewares/auth')
const { createPost } = require('../controllers/post/createPost')
const { acceptReq } = require('../controllers/post/acceptReq')
const { getPost } = require("../controllers/post/getPost")




// BASE URL - /api/post

router.get('/', getPost)
router.post('/', protectUser, upload.single('file') ,createPost)
router.put('/acceptReq/:id', protectUser, acceptReq);



module.exports = router;
