const express = require('express')
const app = express()
const multer = require('multer')
const {StatusCodes} = require('http-status-codes')
const sharp = require('sharp')

const storage  = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')
  }
})

const upload = multer({ storage })

const validateUpload = (req, res, next) => {
  if(!req.file) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'file is required'
    })
  }

  next()
}

const createThumbnail = (filename, type) => {
  sharp(imagePath)
  .resize(250, 250)
  .toFile(`${__dirname}/images/${filename}_thumbnail.png`)
  .then((res)=> console.log(res))
  .catch((err) => console.log(err))
}

app.post('/upload', upload.single('image'), validateUpload, (req,res) => {
  const { path, filename} = req.file
  // createThumbnail(filename)
  // res.sendFile(`${path}.png`)
})

module.exports = app