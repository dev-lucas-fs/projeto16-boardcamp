const idSchema = require('../models/id.schema')

module.exports = (req, res, next) => {
    const { error } = idSchema.validate({ id: req.params.id })

    if(error)
        return res.sendStatus(500)
    
    return next()
}