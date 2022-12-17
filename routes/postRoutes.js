const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { protectUser } = require('../middlewares/auth')
const { createPost } = require('../controllers/post/createPost')
const {acceptReq}=require('../controllers/post/acceptReq')
const { getPost } = require("../controllers/post/getPost")

const { uploadImage } = require('../controllers/post/uploadImage')
const { getImage } = require('../controllers/post/getImage')


// BASE URL - /api/post

router.get('/',protectUser, getPost)
router.post('/', protectUser, createPost)
router.put('/acceptReq/:id', protectUser, acceptReq);

router.put('/image/:id', upload.single('file'), protectUser, uploadImage)
router.get('/image', protectUser, getImage)


module.exports = router;
