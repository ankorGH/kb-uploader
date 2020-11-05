const fs = require('fs')

try {
  console.log('Creating image folder')

  fs.mkdirSync('images')

  console.log('Image folder created')
} catch(err) {
  if(err.message.includes("already exists")) {
    console.log("Already created images folder")
  }
}