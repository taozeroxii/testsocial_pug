const { faker } = require('@faker-js/faker')
const { sample } = require('lodash')
const Users = require('../models/Users')

const users = []
for (let i = 0; i < process.env.SEED_USERS; i++) {
  users.push({
    email: faker.internet.email(),
    username: `${faker.internet.userName()}${faker.datatype.number(10, 999)}`,
    password: '123',
    displayName: sample([undefined, faker.name.fullName()]),
    birthDate: sample([undefined, faker.date.past()]),
    avatarUrl: sample([undefined, faker.internet.avatar()]),
    gender: sample(['male', 'female', 'none'])
  })
}

module.exports = async () => {
  await Users.insertMany(users)
}
