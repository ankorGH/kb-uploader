const router = require('express').Router()

const { getImages, getSingleImage, uploadSingleImage } = require('./controller')
const upload = require('../middlewares/image-uploader')
const { validateUpload } = require('./validation')

router.post('/upload', upload.single('image'), validateUpload ,uploadSingleImage)
router.get('/', getImages)
router.get('/:path', getSingleImage)

module.exports = router