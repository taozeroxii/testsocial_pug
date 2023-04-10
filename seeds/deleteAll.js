const Users = require('../models/Users')
const Posts = require('../models/Posts')
const Comments = require('../models/Comments')

module.exports = () => {
  return Promise.all([
    Users.deleteMany(),
    Posts.deleteMany(),
    Comments.deleteMany()
  ])
}
