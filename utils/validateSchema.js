module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (eror) {
    next(eror)
  }
}
