const path = require('path')
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
const upload = multer({ dest: path.join(__dirname, '../../temp') })
const validateProfile = require('../../validates/validateProfile')

module.exports = [
  upload.none(), // form-data => req.body (urlencoded)
  validateProfile,
  async (req, res) => {
    if (req.file) {
      const avatarUrl = `/public/avatars/${req.user._id}.jpg`
      const avatarPath = path.join(__dirname, `../..${avatarUrl}`)
      await sharp(req.file.path)
        .resize(150, 150)
        .jpeg({ quality: 70 })
        .toFile(avatarPath)
      await fs.promises.unlink(req.file.path)
      req.user.avatarUrl = avatarUrl
    }
    req.user.displayName = req.body.displayName
    req.user.gender = req.body.gender
    req.user.birthDate = req.body.birthDate
    await req.user.save()
    req.flash('success', 'โปรไฟล์อัพเดทสำเร็จ')
    res.redirect('/profile/edit')
  }
]
