const categorySchema = require('../models/category.schema')

module.exports = (req, res, next) => {
    const { name } = req.body

    const { error } = categorySchema.validate({ name }, { abortEarly: false })
  
    if(error)
        return res.sendStatus(400)
    
    return next()
}