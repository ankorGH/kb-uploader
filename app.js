const express = require('express')
const app = express()
const {StatusCodes} = require('http-status-codes')

app.use('/images', require('./image-uploader-service/route'))

app.use(function (err, req, res, next) {
  let message = 'oh dear, server couldn\'t handle the request'

  if(err.message.includes('no such file')) {
    message = 'image couldn\'t be found'
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message,
    error: err,
  })
})

module.exports = app