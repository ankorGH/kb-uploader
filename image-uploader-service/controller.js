const path = require('path')
const sharp = require('sharp')

const DB = require('../db')
const baseRouteName = '/images'

const uploadSingleImage =  async (req,res) => {
  const { filename } = req.file
  
  const thumbnailURL = await createThumbnail(filename)
  const image = {
    original_image: `${baseRouteName}/${filename}`,
    thumbnail: `${baseRouteName}/${thumbnailURL}`
  }

  DB.write(JSON.stringify(image))
  
  res.sendFile(`${DB.getBaseImagePath()}/${filename}`)
}


const getImages = (req, res) => {
  res.json(DB.read())
}

const getSingleImage = (req, res) => {
  const { path } = req.params
  res.sendFile(`${DB.getBaseImagePath()}/${path}`)
}

module.exports = {
  getImages,
  getSingleImage,
  uploadSingleImage
}


async function createThumbnail(filename) {
  const getThumbnailName = () => {
    const originalName = filename.split('.')[0]
    return `${originalName}_thumbnail${path.extname(filename)}`
  }

  return new Promise((resolve, reject) => {
    sharp(`${DB.getBaseImagePath()}/${filename}`)
    .resize(250, 250)
    .toFile(`${DB.getBaseImagePath()}/${getThumbnailName()}`)
    .then(() => resolve(getThumbnailName()))
    .catch(reject)
  })
}
