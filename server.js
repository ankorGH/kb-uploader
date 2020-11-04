const app = require('./app')
const db = require('./db')
const PORT = 9090

async function run() {
  await db.setup()
  
  app.listen(PORT, () => {
    console.log(`Listening at PORT: ${PORT}`)
  })
}

run()