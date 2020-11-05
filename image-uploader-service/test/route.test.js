const { StatusCodes } = require('http-status-codes')
const request = require('supertest')
const app = require('../../app')

describe('Image Uploader Service: ', () => {

  test('[POST] /images/upload - validates if image is available', async () => {
    const response = await request(app).post('/images/upload')

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body.message).toBe('file is required')
  })

  test('[POST] /images/upload - uploads an image and creates thumbnail', async () => {
    const response = await request(app).post('/images/upload').attach('image', `${__dirname}/resources/test-image.png`)

    expect(response.status).toBe(StatusCodes.OK)
    expect(Buffer.isBuffer(response.body)).toBe(true)
  })
})