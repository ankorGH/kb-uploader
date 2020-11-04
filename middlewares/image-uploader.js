const path = require('path')
const multer = require('multer')

const storage  = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    path
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

module.exports = upload
