const { Router, json } = require('express')
const { create, finish, deleteRental, getAll } = require('../controllers/rental.controller')
const rentalSchemaValidationMiddleware = require("../middlewares/rentalSchemaValidation.middleware")
const gameExistByIdMiddleware = require("../middlewares/gameExistById.middleware")
const customerExistById = require("../middlewares/customerExistById.middleware")
const isGameAvailableMiddleware = require('../middlewares/isGameAvailableMiddleware')
const rentalExistMiddleware = require("../middlewares/rentalExist.middleware")
const idSchemaValidationMiddleware = require("../middlewares/idSchemaParamsValidation.middleware")

const router = Router()

router.use(json())

router.get('/rentals', getAll)
router.post('/rentals', rentalSchemaValidationMiddleware, customerExistById, gameExistByIdMiddleware, isGameAvailableMiddleware, create)
router.post('/rentals/:id/return', idSchemaValidationMiddleware, rentalExistMiddleware, finish)
router.delete('/rentals/:id', idSchemaValidationMiddleware, rentalExistMiddleware, deleteRental)

module.exports = router

// , gameExistByIdMiddleware, , , rentalSchemaValidationMiddleware, customerExistById, , 