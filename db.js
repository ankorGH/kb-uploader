const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { once } = require('events')

class DB {
  constructor(dbName = 'images.txt', imageDir = '/images') {
    this.images = []
    this.dbName = dbName
    this.baseImagePath = path.join(__dirname, imageDir)

    if(!fs.existsSync(this.dbName)) {
      const writeStream = fs.createWriteStream(this.dbName)
      writeStream.end()
    }
  }

  getBaseImagePath() {
    return this.baseImagePath
  }

  read() {
    return this.images
  }

  async setup() {
    const rl = readline.createInterface({
      input: fs.createReadStream(this.dbName),
      crlfDelay: Infinity
    })

    rl.on('line', line => {
      this.images.push(JSON.parse(line))
    })

    await once(rl, 'close')
  }

  write(info){
      fs.appendFileSync(this.dbName, info + '\r\n', {
        encoding: 'utf-8',
      })
      this.images.push(JSON.parse(info))
    }
}

module.exports = new DB()