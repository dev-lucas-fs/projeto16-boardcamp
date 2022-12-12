const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required().min(1),
    stockTotal: Joi.number().required().min(1).integer(),
    pricePerDay: Joi.number().required().min(1).integer(),
    image: Joi.string(),
    categoryId: Joi.number().required().integer()
})