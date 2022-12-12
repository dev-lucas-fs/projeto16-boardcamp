const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required().min(1),
    birthday: Joi.date().required(),
    phone: Joi.string().required().min(10).max(11),
    cpf: Joi.string().required().length(11)
})