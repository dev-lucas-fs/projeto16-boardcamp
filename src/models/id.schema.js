const Joi = require("joi");

module.exports = Joi.object({
    id: Joi.number().required().integer().min(1)
})