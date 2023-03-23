const dotenv = require('dotenv')
const path = require('path')
const isProds = require('./utils/isProds')

const dotenvOptions = {
  path: isProds
    ? path.join(__dirname, '.env.prod')
    : path.join(__dirname, '.env.dev')
}

dotenv.config(dotenvOptions)

const { PORT } = process.env

const app = require('./backend/express')
const connectMongoDB = require('./backend/connectMongoDB')

const startApp = async () => {
  try {
    await connectMongoDB()
    require('./backend/usePassport')
    app.listen(PORT, () => {
      console.log(`Server is started on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.log(new Date(), err)
    process.exit(1)
  }
}

startApp()
