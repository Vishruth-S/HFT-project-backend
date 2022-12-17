const Post = require('../../models/Post')
const { uploadFile } = require('../../utils/s3');
const { getObjectSignedUrl } = require('../../utils/s3');

const createPost = async (req, res) => {
    const {
        title,
        desc,
        numberOfServing,
        expiry,
        isNonVeg,
        username,
        coordinates,
        address,
        city,
        state,
        contactInfo,
    } = req.body

    const file = req.file;
    const imageName = req.file.originalname
    const fileBuffer = file.buffer;
    await uploadFile(fileBuffer, imageName, file.mimetype)

    const url = await getObjectSignedUrl(imageName);
    console.log(url)
    // const orginalLink = process.env.BASEURL + "images/" + file.originalname;

    try {
        const user = await Post.create({
            userId: req.session.user._id, title, desc, numberOfServing, expiry, isNonVeg, username, coordinates, address,
            city, state, contactInfo, imageUrl: url
        })

        res.status(201).json({
            message: "Post Created Successfully",
            data: user
        })
    } catch (err) {
        return res
            .status(500).json({ error: 'Something went wrong', message: err.message })
    }
}

module.exports = { createPost }