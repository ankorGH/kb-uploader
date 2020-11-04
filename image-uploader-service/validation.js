const {StatusCodes} = require('http-status-codes')

const validateUpload = (req, res, next) => {
  if(!req.file) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'file is required'
    })
  }

  next()
}

module.exports = {
  validateUpload
}