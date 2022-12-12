const rentalSchema = require('../models/rental.schema')

module.exports = (req, res, next) => {
    const { customerId, gameId, daysRented } = req.body

    const { error } = rentalSchema.validate({ customerId, gameId, daysRented })

    if (error)
        return res.sendStatus(400)
    
    return next()
}