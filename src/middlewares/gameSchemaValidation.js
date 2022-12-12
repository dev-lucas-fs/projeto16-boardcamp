const gamesSchema = require('../models/games.schema')

module.exports = (req, res, next) => {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body

    const { error } = gamesSchema.validate(
        { name, image, stockTotal, categoryId, pricePerDay }, 
        { abortEarly: false }
    )

    if(error)
        return res.status(400).send(error)
    
    return next()
}