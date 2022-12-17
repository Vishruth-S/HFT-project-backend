const Post = require('../../models/Post')
const User = require('../../models/User')
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
    const orginalLink = process.env.BASEURL + "images/" + file.originalname;

    try {

        const user = await Post.create({
         title, desc, numberOfServing, expiry, isNonVeg, username, coordinates, address,
            city, state, contactInfo, imageUrl: url
        })

        // const credit = req.session.user.credit;
        // const updateCredit = credit + 10;
        // console.log(updateCredit)
        // // update credit in user
        // await User.findByIdAndUpdate(req.session.user._id, { credit: updateCredit })

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