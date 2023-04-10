const path = require('path')

require('dotenv').config({
  path: path.join(__dirname, '../.env.dev')
})

const seedDeleteAll = require('./deleteAll')
const seedUsers = require('./users')
const connectMongoDB = require('../backend/connectMongoDB')

async function run () {
  console.log('Starting...')
  await connectMongoDB()
  if (process.env.SEED_DELETE_OLD_DATA === 'true') {
    console.log('delete all ...')
    await seedDeleteAll()
  }
  console.log('Seed users ...')
  await seedUsers()
  process.exit(0)
}
run()
