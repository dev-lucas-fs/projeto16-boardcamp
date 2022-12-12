const Joi = require("joi");

module.exports = Joi.object({
    customerId: Joi.number().required().integer().min(1),
    gameId: Joi.number().required().integer().min(1),
    daysRented: Joi.number().required().integer().min(1)
})