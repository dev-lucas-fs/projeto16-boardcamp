const customerSchema = require('./../models/customer.schema')

module.exports = async (req, res, next) => {
    const { name, phone, cpf, birthday } = req.body

    const  { error}  = customerSchema.validate({ name, phone, cpf, birthday }, { abortEarly: false })

    if (error)
        return res.sendStatus(400)

    return next()
}