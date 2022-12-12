const { Router, json } = require('express')
const { getAll, getById, create, update } = require('./../controllers/customer.controller')
const idValidationMiddleware = require('../middlewares/idSchemaParamsValidation.middleware')
const customerSchemaValidationMiddleware = require('../middlewares/customerSchemaValidation.middleware')
const customerNotExistByCpfMiddleware = require('../middlewares/customerNotExistByCpf.middleware')
const router = Router()

router.use(json())

router.get('/customers', getAll)
router.get('/customers/:id', idValidationMiddleware, getById)
router.post('/customers', customerSchemaValidationMiddleware, customerNotExistByCpfMiddleware, create)
router.put('/customers/:id', idValidationMiddleware, customerSchemaValidationMiddleware, customerNotExistByCpfMiddleware, update)

module.exports = router